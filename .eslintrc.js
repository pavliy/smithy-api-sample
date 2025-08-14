module.exports = {
	extends: ['prettier'],
	ignorePatterns: [
		'**/dist/*',
		'**/output/*',
		'**/generated-client/*',
		'**/node_modules/*',
		'**/.next/*',
		'**/coverage/*',
		'**/.husky/*',
		'**/terraform/.terraform/*',
		'**/terraform/terraform.tfstate*',
		'**/terraform/.terraform.lock.hcl',
		'**/dev-tools/node_modules/*',
	],
	overrides: [
		{
			files: [
				'**/__tests__/**/*.test.ts',
				'**/__tests__/**/*.spec.ts',
				'**/vitest.config.ts',
				'**/automation/**/*.ts',
				'**/setupMocks.ts',
			],
			rules: {
				'import/first': 'off',
				'import/no-extraneous-dependencies': 'off', // Allow vitest imports in test files
			},
			globals: {
				vi: 'readonly',
				describe: 'readonly',
				it: 'readonly',
				test: 'readonly',
				expect: 'readonly',
				beforeEach: 'readonly',
				afterEach: 'readonly',
				beforeAll: 'readonly',
				afterAll: 'readonly',
			},
		},
		{
			files: ['**/dev-tools/**/*.ts', '**/scripts/**/*.ts', '**/build.ts'],
			rules: {
				'no-console': 'off', // Allow console in dev tools and scripts
			},
		},
		{
			files: ['**/esbuild.config.ts', '**/vitest.config.ts'],
			rules: {
				'sort-keys': 'off', // Config files don't need sorted keys
			},
		},
		{
			files: ['**/scripts/**/*.ts'],
			rules: {
				'no-use-before-define': 'off', // Allow function hoisting in scripts
				'@typescript-eslint/no-shadow': 'off', // Allow variable shadowing in scripts
				'consistent-return': 'off', // Allow inconsistent returns in scripts
				'no-underscore-dangle': 'off', // Allow __dirname, __filename in scripts
				'no-unused-vars': 'off', // Allow unused vars in scripts
				'@typescript-eslint/no-unused-vars': 'off', // Allow unused vars in scripts
			},
		},
		{
			files: ['**/domain/**/*.ts', '**/application/errors.model.ts', '**/persistence/*.entity.ts', '**/infra/**/*.ts'],
			rules: {
				'max-classes-per-file': 'off', // Allow multiple related classes in domain/entity files
				'class-methods-use-this': 'off', // Allow utility methods that don't use 'this'
			},
		},
		{
			files: ['**/dev-tools/**/*.ts'],
			rules: {
				'import/no-unresolved': 'off', // Allow unresolved imports in dev tools (generated clients)
			},
		},
	],
	root: true,
	rules: {
		// Explicitly disable formatting rules that conflict with Prettier
		indent: 'off',
		'@typescript-eslint/indent': 'off',
		'space-before-function-paren': 'off',
		'@typescript-eslint/space-before-function-paren': 'off',
		'array-bracket-spacing': 'off',
		'comma-dangle': 'off',
		'eol-last': 'off',
		'keyword-spacing': 'off',
		'no-trailing-spaces': 'off',
		'object-curly-spacing': 'off',
		semi: 'off',
		'space-infix-ops': 'off',

		// Keep the business logic rules
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				fixStyle: 'inline-type-imports',
				prefer: 'type-imports',
			},
		],
		'@typescript-eslint/no-import-type-side-effects': 'warn',
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true,
				optionalDependencies: false,
				peerDependencies: false,
			},
		],
		'sort-imports': 'off', // Disabled - too rigid, conflicts with logical import grouping
		'sort-keys': 'off', // Disabled - too strict for practical development
		'no-console': 'warn', // Changed from default 'error' to 'warn'
		'no-useless-constructor': 'off', // Turn off for dependency injection patterns
		'no-empty-function': 'off', // Turn off for dependency injection patterns
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
			typescript: {
				alwaysTryTypes: true,
				project: './tsconfig.json',
			},
		},
	},
};
