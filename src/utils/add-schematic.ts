import { execScript } from './exec-script';

export const addSchematic = async (
	name: string,
	path: string,
	options = ''
): Promise<string> =>
	await execScript(
		`ng add ${name}@latest --skip-confirmation ${options}`.trim(),
		path
	);
