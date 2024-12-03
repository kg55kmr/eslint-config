import eslint from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import tseslint from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import globals from "globals";

export default (env = "browser") =>
  tseslint.config(
    { ignores: ["dist/", ".*/"] },
    eslint.configs.recommended,
    tseslint.configs.recommended,
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
      languageOptions: { globals: { ...globals[env] } },
    }
  );
