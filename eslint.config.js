/// <reference types="node" />

import eslint from "@eslint/js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import typescriptEslint from "typescript-eslint";

export default typescriptEslint.config(
  eslint.configs.recommended,
  ...typescriptEslint.configs.strictTypeChecked,
  ...typescriptEslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.js"],
          defaultProject: "./tsconfig.json",
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  }
);
