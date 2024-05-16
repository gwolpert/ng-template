// @ts-expect-error - Ignore missing types for inquirer
import inquirer, { QuestionCollection } from 'inquirer';
import { BasicInformation } from '../interfaces/basic-information';

export const promptBasicInformation = async (): Promise<BasicInformation> => {
	const questions: QuestionCollection<BasicInformation> = [
		{
			type: 'input',
			name: 'name',
			message: 'What is the name of your project?',
			validate: (value: string) =>
				!!RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).exec(value) ||
				'Please enter a valid project name (kebab-case)',
		},
		{
			type: 'input',
			name: 'prefix',
			message: 'What is the prefix of your project?',
			validate: (value: string) =>
				!!RegExp(/^[a-z]+$/).exec(value) ||
				'Please enter a valid prefix (lowercase letters only)',
		},
		{
			type: 'input',
			name: 'destinationFolder',
			message: 'Destination folder:',
			default: process.cwd() + '/dist',
		},
	];

	return inquirer.prompt<BasicInformation>(questions);
};
