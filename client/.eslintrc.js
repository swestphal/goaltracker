module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'react-app'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: '2020',
    sourceType: 'module'
  },
  plugins: [ 'react', 'json-format' ],
  rules: {
    quotes: [
      'error',
      'single'
    ],
    indent: [
      'error',
      2
    ],
    'object-curly-spacing': [ 'error', 'always', { 'objectsInObjects': true } ],
    'array-bracket-spacing': [ 'error', 'always', { 'arraysInArrays': false } ],
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
