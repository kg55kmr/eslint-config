import js from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import ts from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import globals from "globals";

export default (env = "browser") =>
  ts.config(
    { ignores: ["dist/", ".*/"] },
    js.configs.recommended,
    ts.configs.recommended,
    ...svelte.configs["flat/recommended"],
    {
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
          },
        ],
      },
    },
    {
      plugins: { perfectionist },
      rules: {
        "perfectionist/sort-imports": [
          "error",
          {
            type: "natural",
            sortSideEffects: true,
            groups: [
              "builtin",
              "external",
              "internal",
              "parent",
              ["index", "sibling"],
              "style",
              "side-effect",
              "side-effect-style",
            ],
          },
        ],
      },
    },
    {
      files: ["**/*.svelte"],
      languageOptions: {
        parserOptions: {
          svelteFeatures: {
            experimentalGenerics: true,
          },
        },
      },
    },
    {
      languageOptions: {
        parserOptions: { parser: ts.parser },
        globals: { ...globals[env] },
      },
    },
    {
      files: ["src/**/{*.server,+server}.{js,ts}"],
      languageOptions: { globals: { ...globals.node } },
    }
  );
