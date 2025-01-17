import js from "@eslint/js";
import type { Linter } from "eslint";
import globals from "globals";
import ts from "typescript-eslint";

export default [
  { files: ["*.ts", "*.d.ts"] },
  { languageOptions: { globals: { ...globals.node } } },
  js.configs.recommended,
  ...ts.configs.recommended as Linter.Config[],
] satisfies Linter.Config[];
