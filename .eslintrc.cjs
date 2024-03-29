module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:tailwindcss/recommended',
        'plugin:prettier/recommended',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        '@typescript-eslint/semi': 0,
        'react/react-in-jsx-scope': 0,
        'jsx-a11y/label-has-associated-control': 0,
        'react-hooks/exhaustive-deps': 0,
    },
    ignorePatterns: ['*.json', '*.html', '*.cjs'],
}
