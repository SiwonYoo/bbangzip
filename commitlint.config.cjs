module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "chore", "docs", "style", "refactor", "test", "ci", "perf", "build"]],
    "subject-case": [0, "never"],
    "subject-full-stop": [0, "never"],
    "header-max-length": [2, "always", 72],
  },
};
