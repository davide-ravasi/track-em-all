// -----------------------------------------------------------------------------
// ESLint flat config (ESLint 9+). The config is a single array of objects;
// ESLint merges them in order (later entries can override earlier ones).
// -----------------------------------------------------------------------------

// Built-in ESLint recommended rules (catches common JS bugs)
import js from '@eslint/js';
// Global variables per environment (browser, node, jest) so ESLint knows what's defined
import globals from 'globals';
// React rules: component best practices, JSX
import react from 'eslint-plugin-react';
// Enforces Rules of Hooks (e.g. no hooks inside conditions/loops)
import reactHooks from 'eslint-plugin-react-hooks';
// Accessibility rules for JSX (alt text, roles, etc.)
import jsxA11y from 'eslint-plugin-jsx-a11y';
// TypeScript-specific rules (e.g. no-unused-vars that understands types)
import tseslint from '@typescript-eslint/eslint-plugin';
// Parses TypeScript/TSX so ESLint can understand the syntax
import tsParser from '@typescript-eslint/parser';
// Turns off ESLint rules that conflict with Prettier (formatting stays Prettier's job)
import prettierConfig from 'eslint-config-prettier';

export default [
  // -------------------------------------------------------------------------
  // 1. Ignores: paths ESLint never lints (generated, tooling, or non-source)
  // -------------------------------------------------------------------------
  {
    ignores: [
      'build/', // Vite build output
      'node_modules/', // Dependencies
      'dist/', // Alternative build output
      'coverage/', // Test coverage reports
      '.netlify/', // Netlify deploy cache/output
      'playwright-report/', // Playwright test reports
      '.lighthouseci/', // Lighthouse CI artifacts
      '.vscode/', // Editor config
      '.github/', // CI workflows (YAML)
      '.cursor/', // Cursor IDE rules
      'docs/', // Documentation (e.g. Markdown)
      'public/', // Static assets (no lintable JS/TS)
    ],
  },

  // -------------------------------------------------------------------------
  // 2. Core recommended: ESLint's built-in "recommended" rule set
  // -------------------------------------------------------------------------
  js.configs.recommended,

  // -------------------------------------------------------------------------
  // 3. Main app config: applies to all .js, .jsx, .ts, .tsx in the project
  // -------------------------------------------------------------------------
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest', // Allow latest JavaScript syntax
      sourceType: 'module', // ESM (import/export)
      globals: {
        ...globals.browser, // window, document, fetch, etc.
        React: 'readonly', // So "React" without import doesn't trigger no-undef (e.g. React.MouseEvent)
        ReactDOM: 'readonly',
      },
      parser: tsParser, // Parse TypeScript so ESLint understands types, interfaces, etc.
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX in the parser
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules, // React 17+ JSX transform
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+ JSX transform
      'react/prop-types': 'off', // Using TypeScript for types, not PropTypes
      'no-unused-vars': 'off', // Use TypeScript rule instead (understands types)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' }, // Allow _unused for intentionally unused params
      ],
    },
    settings: {
      react: {
        version: 'detect', // Use React version from node_modules for plugin behavior
      },
    },
  },

  // -------------------------------------------------------------------------
  // 4. Config files (run in Node): process.env, etc. are defined
  // -------------------------------------------------------------------------
  {
    files: ['playwright.config.ts', 'vite.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // -------------------------------------------------------------------------
  // 5. Backend (Netlify Functions): Node globals so process, require, etc. are defined
  // -------------------------------------------------------------------------
  {
    files: ['functions/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node, // process, require, module, __dirname, etc.
      },
    },
  },

  // -------------------------------------------------------------------------
  // 6. Test files: Jest globals so describe, it, expect, etc. are defined
  // -------------------------------------------------------------------------
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },

  // -------------------------------------------------------------------------
  // 7. Prettier: disable any ESLint rules that conflict with Prettier (must be last)
  // -------------------------------------------------------------------------
  prettierConfig,
];
