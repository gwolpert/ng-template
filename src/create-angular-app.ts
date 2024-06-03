// @ts-expect-error - Ignore missing types for chalk
import chalk from 'chalk';
import { promptBasicInformation } from './modules/prompt-basic-information';
import { ensurePnpmInstallation } from './modules/ensure-pnpm-installation';
import { ensureAngularCliInstallation } from './modules/ensure-angular-cli-installation';
import { generateAngularApp } from './modules/generate-angular-app';
import { addAngularLocalize } from './modules/add-angular-localize';
import { addEslint } from './modules/add-eslint';
import { materializeAssets } from './modules/materialize-assets';

(async () => {
	console.log(`\t${chalk.blueBright('Create Angular App')}`);
	console.log(`\t${chalk.grey('version: 2.0.0 (2024-05-16)')}`);
	console.log(`\t${chalk.grey('author: Gio Wolpert')}`);
	console.log(`
	Welcome to the Create Angular App CLI!
	This CLI-tool will help you to create a new Angular app up and running in no time.
	You will be prompted to answer a few questions to configure your new Angular app.
`);

	// Prompt the user for basic information
	const basicInformation = await promptBasicInformation();
	// Make sure pnpm is installed as the package manager
	await ensurePnpmInstallation();
	// Make sure Angular CLI is installed
	await ensureAngularCliInstallation();
	// Materialize the asset files
	const assetsDir = await materializeAssets(basicInformation);
	// Generate the Angular app
	const appDir = await generateAngularApp(basicInformation, assetsDir);
	// Add EsLint to the Angular app
	await addEslint(appDir, assetsDir);
	// Add Angular Localize to the Angular app
	await addAngularLocalize(appDir);
})();
