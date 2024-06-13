import { Chalk } from 'chalk';
import {
	addAngularLocalize,
	addAngularMaterial,
	addApplicationInsights,
	addEslint,
	addFontAwesome,
	addMsalAuth,
	addReduxState,
	addTailwindCss,
	cleanupInstallation,
	ensureAngularCliInstallation,
	ensurePnpmInstallation,
	generateAngularApp,
	materializeAssets,
	promptBasicInformation,
} from './modules';
import { InstallationContext, PromptedInformation } from './interfaces';

(async () => {
	const { blueBright, blackBright } = new Chalk({ level: 1 });
	console.log(`\t${blueBright('Create Angular App')}`);
	console.log(`\t${blackBright('version: 2.0.0 (2024-05-16)')}`);
	console.log(`\t${blackBright('author: Gio Wolpert')}`);
	console.log(`
	Welcome to the Create Angular App CLI!
	This CLI-tool will help you to create a new Angular app up and running in no time.
	You will be prompted to answer a few questions to configure your new Angular app.
`);

	// Prompt the user for basic information
	const promptedInformation: PromptedInformation =
		await promptBasicInformation();
	// Make sure pnpm is installed as the package manager
	await ensurePnpmInstallation();
	// Make sure Angular CLI is installed
	await ensureAngularCliInstallation();
	// Materialize the asset files
	const assetsDir = await materializeAssets(promptedInformation);
	// Generate the Angular app
	const appDir = await generateAngularApp(promptedInformation, assetsDir);
	// Create the installation context
	const context: InstallationContext = {
		appDir,
		assetsDir,
		promptedInformation,
	};
	// Add EsLint to the Angular app
	await addEslint(context);
	// Add Tailwind CSS to the Angular app
	if (promptedInformation.addTailwindCSS) await addTailwindCss(context);
	// Add Angular Material to the Angular app
	if (promptedInformation.addAngularMaterial) await addAngularMaterial(context);
	// Add Font Awesome to the Angular app
	if (promptedInformation.addFontAwesome) await addFontAwesome(context);
	// Add MSAL to the Angular app
	if (promptedInformation.addMsal) await addMsalAuth(context);
	// Add Redux to the Angular app
	if (promptedInformation.addRedux) await addReduxState(context);
	// Add Logger to the Angular app
	await addApplicationInsights(context);
	// Add Angular Localize to the Angular app
	await addAngularLocalize(context);
	// Clean up the assets directory
	await cleanupInstallation(assetsDir);
	// Done
	process.exit();
})();
