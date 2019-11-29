module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    plugins: ['@typescript-eslint'],
    env: {
        browser: true,
        node: true
    },
    settings: {
        "react": {
            "pragma": "React",
            "version": "detect"
        }
    },
    parserOptions: {
        "ecmaVersion": 2018,
        "sourceType": 'module',
        "ecmaFeatures": {
            jsx: true,
        }
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-explicit-any': 0
    }
};
