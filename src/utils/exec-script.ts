import { exec } from 'child_process';

/**
 * Execute a script in the shell
 * @param command The command to execute
 * @param path The path to execute the command in
 */
export const execScript = async (command: string, path = process.cwd()) => {
	return new Promise<string>((resolve, reject) => {
		exec(command, { cwd: path }, (error, stdout) => {
			if (error) {
				reject(error);
				return;
			}
			resolve(stdout);
		});
	});
};
