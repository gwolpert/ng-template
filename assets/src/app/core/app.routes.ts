import { Routes } from '@angular/router';
import { developmentGuard } from '../domains/development/guards/development.guard';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'home',
	},
	{
		path: 'home',
		loadChildren: () => import('@app/pages/home/home.routes'),
	},
	{
		path: 'development',
		loadChildren: () => import('@app/pages/development/development.routes'),
		canActivate: [developmentGuard],
		canActivateChild: [developmentGuard],
	},
	{
		path: '**',
		loadComponent: () =>
			import('@app/core/components/not-found/not-found.component'),
	},
];
