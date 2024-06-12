import { PromptedInformation } from '../interfaces/prompted-information';
import { createSpinner } from 'nanospinner';
import { cloneDir, replaceFileContent } from '../utils/file-system';

export const materializeAssets = async (
	basicInformation: PromptedInformation
): Promise<string> => {
	const spinner = createSpinner('Materializing assets...').start();
	const assetsDir = `${__dirname}/assets`;
	try {
		await cloneDir(`${__dirname}/../assets`, assetsDir);
		const files = [
			`dist/assets/**/*.ts`,
			'dist/assets/**/*.js',
			'dist/assets/**/*.html',
		];
		replaceFileContent({
			files,
			from: /__appPrefix__/g,
			to: basicInformation.prefix,
		});
		replaceFileContent({
			files,
			from: /__appName__/g,
			to: basicInformation.name,
		});
	} catch (error) {
		spinner.error({ text: 'Failed to materialize assets' });
		console.error(error);
		process.exit(1);
	}

	// Assets have been materialized
	spinner.success({ text: 'Assets have been materialized' });
	return assetsDir;
};
