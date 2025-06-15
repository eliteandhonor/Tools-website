import js from "@eslint/js";
import globals from "globals";

export default [
  // Base ESLint recommended config for JavaScript
  js.configs.recommended,
  {
    languageOptions: {
      // Specify ECMAScript features and global environments
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      }
    },
    rules: {
      // Example additional rules/customizations
      "no-unused-vars": "warn",
      "no-undef": "error",
      "eqeqeq": "error",
      "no-console": "off"
    },
    ignores: ["vendor/**/*", "assets/**/*", "dist/**/*"]
  }
];
