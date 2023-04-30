module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard-with-typescript", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  plugins: ["react"],
  rules: {
    "react/display-name": 0,
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-floating-promises": 0,
    "@typescript-eslint/no-invalid-void-type": 0,
  },
}
