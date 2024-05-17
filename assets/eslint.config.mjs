import globals from "globals";
import pluginJs from "@eslint/js";
import ngLint from '@angular-eslint/eslint-plugin';
import ngLintTemplate from '@angular-eslint/eslint-plugin-template';
import tsLint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import importSortPlugin from 'eslint-plugin-simple-import-sort'

const tsRules = {
  files: ["**/*.ts"],
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
    "@typescript-eslint/no-unused-vars": "error",
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
}

const specRules = {
  files: ["**/*.spec.ts"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  }
}

const htmlRules = {
  files: ["**/*.html"],
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
      {
        checkId: false,
        checkText: true,
        checkAttributes: false,
        checkTextLiterals: true,
      }
    ],
    "eol-last": ["error", "unix"],
  }

}

export default [
  {
    languageOptions: {
      parser: tsLint.parser,
      globals: globals.browser
    },
    plugins: {
      ['typescript-eslint']: tsLint.plugin,
      ['simple-import-sort']: importSortPlugin,
      ['@angular-eslint']: ngLint,
      ['@angular-eslint/template']: ngLintTemplate,
      prettier: prettierPlugin
    },
  },
  ...tsLint.configs.recommended,
  pluginJs.configs.recommended,
  prettierConfig,
  tsRules,
  specRules,
  htmlRules,
];
