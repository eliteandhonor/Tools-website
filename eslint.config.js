// eslint.config.js  (ESLint ≥ 9)
import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "module", ecmaVersion: 2022 },
    rules: {
      "no-console": "warn"
    }
  }
];
