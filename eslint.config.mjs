import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

const tsRules = {
  files: ["**/*.ts"],
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
}

const config = [
  {
    plugins: {
      ['typescript-eslint']: tseslint.plugin,
      prettier: prettierPlugin
    },
    languageOptions: {
      parser: tseslint.parser,
      globals: globals.browser
    },
  },
  ...tseslint.configs.recommended,
  pluginJs.configs.recommended,
  prettierConfig,
  tsRules,
];

export default config;
