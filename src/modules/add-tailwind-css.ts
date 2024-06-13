import { composeModuleFactory } from '../utils/compose-module-factory';
import {
	cloneFile,
	readFileContent,
	writeFileContent,
} from '../utils/file-system';
import { installDependencies } from '../utils/install-dependencies';

export const addTailwindCss = composeModuleFactory(
	'Tailwind CSS',
	async ({ appDir, assetsDir }) => {
		const devDependencies = ['tailwindcss'];
		await installDependencies(appDir, { devDependencies });
		await cloneFile(
			`${assetsDir}/tailwind/tailwind.scss`,
			`${appDir}/src/assets/scss/tailwind.scss`
		);
		await cloneFile(
			`${assetsDir}/tailwind/tailwind.config.js`,
			`${appDir}/tailwind.config.js`
		);
		const globalStyles = await readFileContent(`${appDir}/src/styles.scss`);
		await writeFileContent(
			`${appDir}/src/styles.scss`,
			`${globalStyles.trim()}\n@import 'tailwind';`
		);
	}
);
