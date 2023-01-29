module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'standard-with-typescript'
    ],
    overrides: [],
    parserOptions: {
        ecmaVersion: '2020',
        sourceType: 'module'
    },
    plugins: ['react', 'json-format'],
    rules: {
        quotes: [
            'error',
            'single'
        ],
        indent: [
            'error',
            4
        ],
        // We want to avoid extraneous spaces
        'no-multi-spaces': ['error']
    }
}
