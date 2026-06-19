const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
// Behind Netlify / reverse proxy: trust one hop so req.ip and X-Forwarded-* reflect the client.
app.set('trust proxy', 1);
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { AUTH_FORM_MESSAGES } = require('./utils/authValidation');
const rateLimit = require('express-rate-limit');

/** Best-effort client IP for rate limiting behind a proxy (see trust proxy above). */
const getClientIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }

  return (
    req.ip ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    req.headers['x-nf-client-connection-ip'] ||
    'unknown'
  );
};

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 10, // max requests per key (IP) per window — mitigates brute force on login
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  keyGenerator: (req) => getClientIp(req),
  message: { message: 'Too many requests, try again later.' },
});

const registerLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  limit: 5, // stricter than login — account creation is rare
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  keyGenerator: (req) => getClientIp(req),
  message: { message: 'Too many requests, try again later.' },
});

const favoriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  keyGenerator: (req) => getClientIp(req),
  message: { message: 'Too many requests, try again later.' },
});

// MongoDB (same process as this Netlify Function)
const mongoose = require('mongoose');

// Netlify Functions run on Node, not Vite — use process.env (import.meta.env is undefined here).
const mongoDB = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const {
  getUser,
  loginUser,
  registerUser,
} = require('./controllers/userController');
const {
  addFavorite,
  removeFavorite,
} = require('./controllers/favoriteController');

/**
 * Builds the browser Origin allowlist for the `cors` middleware.
 * - `CORS_ALLOWED_ORIGINS`: comma-separated origins (Functions env / Netlify dashboard), not Vite-bundled.
 * - production with no env: empty set (fail closed until you configure origins).
 * - non-production with no env: common local dev URLs (Vite, CRA, netlify dev).
 */
function getAllowedCorsOrigins() {
  const raw = process.env.CORS_ALLOWED_ORIGINS;
  if (raw && String(raw).trim()) {
    return new Set(
      String(raw)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    );
  }
  if (process.env.NODE_ENV === 'production') {
    return new Set();
  }
  return new Set([
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:8888',
    'http://127.0.0.1:8888',
  ]);
}

const allowedCorsOrigins = getAllowedCorsOrigins();

// CORS: browser enforces this for JS on web pages. See wiki note cors-how-it-works.md (cerebro).
app.use(
  cors({
    origin(origin, callback) {
      // No Origin: non-browser clients (curl, health checks); allow response without ACAO mismatch issues.
      if (!origin) {
        return callback(null, true);
      }
      if (allowedCorsOrigins.has(origin)) {
        return callback(null, true);
      }
      // Rejected: browser hides response body from the page's script (console CORS error).
      return callback(null, false);
    },
    // Bearer in Authorization header; use credentials: true + explicit origins if you switch to cookies.
    credentials: false,
  })
);
// Limit request body size (JSON + urlencoded) — mitigates DoS / resource exhaustion on small API.
// Same cap on both parsers so large payloads cannot bypass via Content-Type.
// https://medium.com/@louistrinh/taming-large-requests-limiting-request-size-in-node-js-6791b7318bd6
app.use(express.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));

app.use(
  helmet({
    // 1. Disattiviamo la CSP sul backend perché la gestisce già Netlify sulla pagina HTML.
    // Inviare una CSP su risposte JSON è superfluo e aumenta solo la dimensione degli header.
    contentSecurityPolicy: false,

    // 2. Manteniamo i pilastri fondamentali per la sicurezza dei dati
    frameguard: { action: 'deny' }, // Impedisce che i tuoi endpoint API vengano caricati dentro iframe malevoli
    hsts: { maxAge: 31536000, includeSubDomains: true }, // Forza la connessione HTTPS sicura anche per l'API
    noSniff: true, // Impedisce il MIME-sniffing anche sulle risposte JSON/File del backend
    xssFilter: true, // Protezione base per i vecchi browser
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
);

const router = express.Router();

/** Require `Authorization: Bearer <jwt>`; sets req.user from verified payload. */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: AUTH_FORM_MESSAGES.accessTokenNotFound });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: AUTH_FORM_MESSAGES.accessTokenNotFound });
  }

  jwt.verify(token, jwtSecret, function (err, decoded) {
    if (err) {
      return res.status(401).json({ message: AUTH_FORM_MESSAGES.invalidToken });
    }
    req.user = decoded; // { id, iat, exp } from login token
    next();
  });
};

router.post('/favorite/remove', protect, favoriteLimiter, removeFavorite);
router.post('/favorite/add', protect, favoriteLimiter, addFavorite);
router.post('/user/register', registerLimiter, registerUser);
router.post('/user/login', loginLimiter, loginUser);
router.get('/user', protect, getUser);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/.netlify/functions/express', router);
app.use(router);

// SPA fallback only for GET / (avoid swallowing POST /user/register, etc.)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Express only treats arity-4 functions as error middleware (see express/lib/router/layer.js).
app.use((err, req, res, _next) => {
  console.error(err);
  const status = Number(err.status) || Number(err.statusCode) || 500;
  const message =
    process.env.NODE_ENV === 'production' && status >= 500
      ? 'Internal server error'
      : err.message || 'An error occurred';
  res.status(status).json({ message });
});

module.exports = app;
module.exports.handler = serverless(app);
