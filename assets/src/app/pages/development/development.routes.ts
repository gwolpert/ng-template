import { Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./development-page/development-page.component'),
	},
];

export default routes;
