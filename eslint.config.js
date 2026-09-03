import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importX from 'eslint-plugin-import-x'

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            importX.flatConfigs.recommended,
            importX.flatConfigs.typescript,
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.app.json', './tsconfig.node.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            'import-x/internal-regex': '^@/',
            'import-x/resolver': {
                typescript: true,
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            // ───── React Refresh ─────
            'react-refresh/only-export-components': 'off',

            // ───── React Hooks ─────
            'react-hooks/exhaustive-deps': 'off',

            // ───── TypeScript ─────
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-require-imports': 'off',

            // ───── Import ─────
            'import-x/no-unresolved': 'off',
            'import-x/namespace': 'off',
            'import-x/named': 'off',
            'import-x/default': 'off',
            'import-x/no-named-as-default': 'off',
            'import-x/no-named-as-default-member': 'off',

            // ───── Import Order ─────
            'import-x/order': [
                'warn',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                        'type',
                    ],
                    pathGroups: [
                        { pattern: 'react', group: 'external', position: 'before' },
                        { pattern: 'react-*', group: 'external', position: 'before' },
                        { pattern: '@/**', group: 'internal', position: 'after' },
                    ],
                    pathGroupsExcludedImportTypes: ['react', 'react-*'],
                    'newlines-between': 'never',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
        },
    },
)