import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      // JavaScript/TypeScript правила
      // "no-console": "warn",
      // "semi": ["error", "always"],
      // "quotes": ["error", "single"],

      // React правила
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off", // Отключить правило для React в пределах JSX
      "react/jsx-uses-react": "off", // Отключает правило, требующее импорта React для JSX
      "@typescript-eslint/no-explicit-any": "off", // Отключает правило, обязующающее указывать вместо any определенные типы
      // её лучше включить (префер конст)
      "prefer-const": "off", // prefer-const рекомендует использовать const вместо let, если переменная не переназначается после её создания
    },
  },
];
