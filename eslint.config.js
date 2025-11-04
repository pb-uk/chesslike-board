import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

import vitest from '@vitest/eslint-plugin';

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		plugins: {
			js,
		},
		extends: ['js/recommended'],
		languageOptions: { globals: globals.browser },
		rules: {},
	},
	{
		files: ['**/*.{spec,test}.{js,mjs,cjs,ts,mts,cts}'],
		plugins: {
			vitest,
		},
		rules: {
			...vitest.configs.recommended.rules,
		},
	},

	{
		rules: {},
	},
	tseslint.configs.recommended,
	globalIgnores(['dist']),
]);
