/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '@app/core/app.config';
import { RootComponent } from '@app/core/components/root/root.component';

bootstrapApplication(RootComponent, appConfig).catch((err) =>
	console.error(err)
);
