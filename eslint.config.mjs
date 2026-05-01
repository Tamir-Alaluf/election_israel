import nextVitals from "eslint-config-next/core-web-vitals";
import tseslint from "@typescript-eslint/eslint-plugin";

const config = [
  ...nextVitals,
  {
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
];

export default config;
