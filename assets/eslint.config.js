const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const prettier = require("eslint-plugin-prettier");
const prettierConfig = require("eslint-config-prettier");
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const globals = require("globals");

const tsCfg = {
  files: ["**/*.ts"],
  languageOptions: {
    parser: tseslint.parser,
    globals: { ...globals.browser },
  },
  plugins: {
    prettier,
    ['simple-import-sort']: simpleImportSort,
  },
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    ...angular.configs.tsRecommended,
    prettierConfig,
  ],
  processor: angular.processInlineTemplates,
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
        tabWidth: 2,
        useTabs: true,
        semi: true,
        singleQuote: true,
        quoteProps: "consistent",
        trailingComma: "es5",
        bracketSpacing: true,
        arrowParens: "always",
        endOfLine: "lf",
      }
    ],
    "@angular-eslint/directive-selector": [
      "error",
      { type: "attribute", prefix: "__appPrefix__", style: "camelCase" }
    ],
    "@angular-eslint/component-selector": [
      "error",
      { type: "element", prefix: "__appPrefix__", style: "kebab-case" }
    ],
    "@angular-eslint/prefer-on-push-component-change-detection": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }
    ],
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      { accessibility: "no-public" }
    ],
    "eol-last": ["error", "unix"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-console": [ "warn", { allow: ["warn", "error"] } ],
    "no-alert": "error",
  },
};

const specCfg = {
  ...tsCfg,
  files: ["**/*.spec.ts"],
  languageOptions: {
    parser: tseslint.parser,
    globals: { ...globals.browser, ...globals.jasmine },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  }
}

const htmlCfg = {
  files: ["**/*.html"],
  plugins: {
    prettier,
  },
  extends: [
    ...angular.configs.templateRecommended,
    ...angular.configs.templateAccessibility,
    prettierConfig,
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
        tabWidth: 2,
        useTabs: true,
        endOfLine: "lf",
        parser: "angular",
        embeddedLanguageFormatting: "off",
        bracketSameLine: true,
        htmlWhitespaceSensitivity: "strict",
      }
    ],
    "@angular-eslint/template/i18n": [
      "error",
      { ignoreAttributes: ["content", "rel"]}
    ],
    "eol-last": ["error", "unix"]
  },
}

module.exports = tseslint.config(tsCfg, specCfg, htmlCfg);
