import { DependencySpecification } from '../interfaces';
import { execScript } from './exec-script';

export const installDependencies = async (
	dir: string,
	specification: DependencySpecification
): Promise<void> => {
	const devDependencies = specification?.devDependencies?.join(' ');
	if (devDependencies?.length)
		await execScript(`pnpm install --save-dev ${devDependencies}`, dir);
	const dependencies = specification.dependencies?.join(' ');
	if (dependencies?.length)
		await execScript(`pnpm install --save ${dependencies}`, dir);
};
