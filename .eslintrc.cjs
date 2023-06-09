module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', 'simple-import-sort'],
  settings: {
    'import/resolver': {
      typescript: {},
      alias: {
        map: [
          ['@', './src'],
        ],
      }
    },
  },
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages `react` related packages come first.
          ["^react", "^@?\\w"],
          // Internal packages components or hooks
          ["^(@|components|hooks)"],
          // Material UI packages.
          ["^@mui/material"],
          // @/utils
          ["^@/utils"],
          // types
          ["^@/ts"],
          // assets and icons
          ["^@/assets", "^@mui/icons-material"],
          // Style imports.
          ["^.+\\.?(css)$"]
        ],
      },
    ],
    'simple-import-sort/exports': 'error', 
  }
};
