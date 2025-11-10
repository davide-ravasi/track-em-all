module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start",
      url: ["http://localhost:5173"],
      numberOfRuns: 3,
      staticDistDir: "./build",
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
