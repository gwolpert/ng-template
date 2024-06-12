// @ts-expect-error - Ignore missing types for inquirer
import inquirer, { DistinctQuestion } from 'inquirer';
import { PromptedInformation } from '../interfaces';
import { resolve } from 'path';

export const promptBasicInformation =
	async (): Promise<PromptedInformation> => {
		const args = process.argv
			.filter((arg) => arg.startsWith('--'))
			.reduce(
				(acc, arg) => {
					const [key, value] = arg.split('=');
					acc[key.replace('--', '')] = value;
					return acc;
				},
				{} as Record<string, string>
			);

		const questions: Array<DistinctQuestion<PromptedInformation>> = [];

		if (!args.name) {
			questions.push({
				type: 'input',
				name: 'name',
				message: 'What is the name of your project?',
				validate: (value: string) =>
					!!RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).exec(value) ||
					'Please enter a valid project name (kebab-case)',
			});
		}

		if (!args.prefix) {
			questions.push({
				type: 'input',
				name: 'prefix',
				message: 'What is the prefix of your project?',
				validate: (value: string) =>
					!!RegExp(/^[a-z]+$/).exec(value) ||
					'Please enter a valid prefix (lowercase letters only)',
			});
		}

		if (!args.destinationFolder) {
			questions.push({
				type: 'input',
				name: 'destinationFolder',
				message: 'Destination folder:',
				default: resolve(process.cwd() + '/dist'),
			});
		}

		const basicInformation =
			await inquirer.prompt<PromptedInformation>(questions);
		basicInformation.name ??= args.name;
		basicInformation.prefix ??= args.prefix;
		basicInformation.destinationFolder ??= args.destinationFolder;

		basicInformation.destinationFolder = resolve(
			basicInformation.destinationFolder
		);

		return basicInformation;
	};
