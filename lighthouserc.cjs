module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start",
      url: ["http://localhost:5173"],
      numberOfRuns: 3,
      staticDistDir: "./build",
      settings: {
        maxWaitForFcp: 30000,
        maxWaitForLoad: 60000,
        chromeFlags: "--no-sandbox --disable-gpu",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.6 }],
        "categories:accessibility": ["error", { minScore: 0.8 }],
        "categories:seo": ["off"],
        "categories:best-practices": ["off"],
      },
    },
  },
};
