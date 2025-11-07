module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-pattern": [2, "always", /^(:\w+:|[\u{1F300}-\u{1F9FF}])\s[a-z]+:.+/u],
    "type-enum": [2, "always", ["feat", "fix", "chore", "docs", "style", "refactor", "test", "ci", "perf", "build"]],
    "subject-case": [0, "never"],
    "subject-full-stop": [0, "never"],
    "header-max-length": [2, "always", 72],
  },
};
