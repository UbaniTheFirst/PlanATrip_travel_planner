const js = require("@eslint/js");
const globals = require("globals");
const reactHooks = require("eslint-plugin-react-hooks");
const reactRefresh = require("eslint-plugin-react-refresh");

module.exports = {
  root: true,
  extends: [js.configs.recommended],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    sourceType: "module",
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  ignorePatterns: ["dist"],
};
