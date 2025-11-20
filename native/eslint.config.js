import globals from 'globals';
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import reactNative from 'eslint-plugin-react-native';

export default tseslint.config([
  { ignores: ['dist', 'node_modules', '.expo', '.expo-shared'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.es2021,
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        global: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      unicorn,
      'react-native': reactNative,
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Enforce kebab-case filenames
      'unicorn/filename-case': [
        'error',
        {
          cases: { kebabCase: true },
        },
      ],
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
    },
  },
]);

