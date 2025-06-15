// eslint.config.js
import js from "@eslint/js";

/**
 * Minimal, extendable base for Node + browser tooling.
 * Docs: https://eslint.org/docs/latest/use/configure/flat-config
 */
export default [
  // 1) ESLint built-in “recommended” rules
  js.configs.recommended,

  // 2) Project-specific adjustments
  {
    files: [
      "*.js",
      "scripts/**/*.{js,jsx}",
      "tools/**/*.{js,jsx}"
    ],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module"
    },
    env: {
      node: true,
      es2022: true
    },
    rules: {
      "no-console":        "warn",
      "no-unused-vars":   ["warn", { "argsIgnorePattern": "^_" }]
      // add more tweaks here
    }
  }
];
