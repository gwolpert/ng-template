import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import eslint from "@eslint/js";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config({
  files: ["src/**/*.ts"],
  languageOptions: {
    parser: tseslint.parser,
    globals: globals.browser
  },
  plugins: {
    prettier,
    ['simple-import-sort']: simpleImportSort,
  },
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    prettierConfig
  ],
  rules: {
    "no-undef": "off",
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
    ]
  }
});
