const js = require('@eslint/js');
const tsPlugin = require('typescript-eslint');
const reactPlugin = require('eslint-plugin-react');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
    {
        ignores: ['.next/**', 'node_modules/**', 'pnpm-lock.yaml'],
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        languageOptions: {
            globals: {
                browser: true,
                node: true,
            },
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: { js },
        extends: ['js/recommended'],
    },
    tsPlugin.configs.recommended,
    reactPlugin.configs.flat.recommended,
    {
        ignores: ['.next/**', 'node_modules/**', 'pnpm-lock.yaml'],
        files: ['**/*.{ts,tsx}'],
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/jsx-max-props-per-line': ['error', { maximum: 3 }],
            'max-len': [
                'error',
                { code: 120, tabWidth: 4, ignoreStrings: true },
            ],
            '@typescript-eslint/no-unused-vars': 'off',
            'preserve-caught-error': 'off'
            // [
            //     'warn',
            //     { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            // ],
        },
    },
]);
