import neostandard from "neostandard";
import pluginHtml from "eslint-plugin-html";
import globals from "globals";

export default [
  ...neostandard({
    ignores: [
      ...neostandard.resolveIgnoresFromGitignore(),
      "**/temp/**/*",
      "dist/**"
    ],
    env: [
      "node"
    ],
    semi: true
  }),
  {
    files: [
      "**/*.webc",
      "**/*.html"
    ],
    plugins: { html: pluginHtml },
    settings: {
      "html/html-extensions": [
        ".html",
        ".webc"
      ]
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      parserOptions: {
        ecmaFeatures: {
          globalReturn: true
        }
      },
      globals: {
        ...globals.browser,
        page: "readonly",
        collections: "readonly",
        eleventy: "readonly",
        pagination: "readonly",
        title: "readonly",
        content: "readonly",
        slugify: "readonly",
        isCurrentPage: "readonly",
        webc: "readonly"
      }
    },
    rules: {
      "no-unused-expressions": "off",
      "no-unused-vars": "off",
      "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/comma-dangle": ["error", "never"],
      "@stylistic/no-multi-spaces": ["error"]
    }
  },
  {
    // WebC templates reference template/framework globals ESLint can't see,
    // so undefined-variable detection would produce false positives.
    files: ["**/*.webc"],
    rules: {
      "no-undef": "off"
    }
  },
  {
    // Plain HTML demos contain real script, so we catch undefined variables.
    files: ["**/*.html"],
    rules: {
      "no-undef": "error"
    }
  },
  {
    // Test files contain callbacks passed to page.evaluate() that execute in
    // the browser, so they reference browser globals (getComputedStyle, Node…).
    files: [
      "src/**/*.js",
      "src/tests/**/*.js"
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/comma-dangle": ["error", "never"],
      "@stylistic/no-multi-spaces": ["error"],
      "@stylistic/lines-between-class-members": "off"
    }
  }
];
