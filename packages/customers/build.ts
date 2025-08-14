import fs from 'fs';
import { build } from 'esbuild';

import esbuildConfig from './esbuild.config';

const distPath = './dist';

try {
	const buildResult = await build(esbuildConfig);
	if (esbuildConfig.metafile) {
		fs.writeFileSync(`${distPath}/buildMeta.json`, JSON.stringify(buildResult.metafile, null, 2));
	}

	console.log('Build complete');
} catch (error) {
	console.error(error);
	process.exit(1);
}

export const one = 1;
