module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: [".nuxt", "node_modules", "dist", ".output"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaVersion: 2022,
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:vue/vue3-recommended",
    "plugin:nuxt/recommended",
  ],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-multiple-template-root": "off",
    "vue/require-default-prop": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "space-before-function-paren": ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    semi: ["error", "always"],
    quotes: ["error", "single"],
    "vue/html-indent": ["error", 2],
    "vue/script-indent": ["error", 2],
    indent: ["error", 2],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 3,
        multiline: 1,
      },
    ],
  },
};
