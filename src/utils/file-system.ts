import { copyFile, mkdir, writeFile, readFile } from 'fs';
import { copy, remove } from 'fs-extra';
import { replaceInFile, ReplaceInFileConfig } from 'replace-in-file';

/**
 * Clones a file from src to dest
 * @param src Directory of the file to clone
 * @param dest Destination directory to clone the file to
 */
export const cloneFile = (src: string, dest: string): Promise<void> =>
	new Promise((resolve, reject) =>
		copyFile(src, dest, (error) => (error ? reject(error) : resolve()))
	);

/**
 * Removes a file
 * @param path Path to the file to remove
 */
export const removeFile = (path: string): Promise<void> =>
	new Promise((resolve, reject) =>
		remove(path, (error) => (error ? reject(error) : resolve()))
	);

/**
 * Clones a directory
 * @param src Directory to clone
 * @param dest Destination directory to clone the directory to
 */
export const cloneDir = (src: string, dest: string): Promise<void> =>
	new Promise((resolve, reject) =>
		copy(src, dest, (error) => (error ? reject(error) : resolve()))
	);

/**
 * Creates a directory
 * @param path Path to the directory to create
 */
export const createDir = (path: string): Promise<void> =>
	new Promise((resolve, reject) =>
		mkdir(path, { recursive: true }, (error) =>
			error ? reject(error) : resolve()
		)
	);

/**
 * Reads the content of a file
 * @param path Path to the file to read
 */
export const readFileContent = (path: string): Promise<string> =>
	new Promise((resolve, reject) =>
		readFile(path, { encoding: 'utf-8' }, (error, data) =>
			error ? reject(error) : resolve(data)
		)
	);

/**
 * Writes content to a file
 * @param path Path to the file to write to
 * @param content Content to write to the file
 */
export const writeFileContent = (
	path: string,
	content: string
): Promise<void> =>
	new Promise((resolve, reject) =>
		writeFile(path, content, { encoding: 'utf-8' }, (error) =>
			error ? reject(error) : resolve()
		)
	);

/**
 * Replaces content in a file
 * @param replacements Replacements to make in the file
 */
export const replaceFileContent = async (
	replacements: ReplaceInFileConfig
): Promise<void> => {
	await replaceInFile(replacements);
};
