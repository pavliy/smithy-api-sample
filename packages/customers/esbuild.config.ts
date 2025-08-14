import type { BuildOptions } from 'esbuild';

const isCi = process.env.CI === 'true';
const distPath = './dist';
const esbuildConfig: BuildOptions = {
	entryPoints: ['src/index.ts'],
	bundle: true,
	metafile: !isCi,
	keepNames: true,
	format: 'esm',
	minify: true,
	treeShaking: true,
	sourcemap: true,
	target: 'ESNext',
	platform: 'node',
	outfile: `${distPath}/index.mjs`,
	// https://github.com/evanw/esbuild/pull/2067
	banner: {
		js: `
          import { createRequire } from 'module';
          import path from 'path';
          import { fileURLToPath } from 'url';

          const require = createRequire(import.meta.url);
          const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
          const __dirname = path.dirname(__filename); // get the name of the directory
        `,
	},
	external: [
		'graphql/language/visitor',
		'graphql/language/printer',
		'graphql/utilities',
		'aws-sdk',
		'@aws-sdk',
		'node_modules',
		'dd-trace',
		'datadog-lambda-js',
	],
};

export default esbuildConfig;
