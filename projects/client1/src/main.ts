import { importProvidersFrom } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app/demo/demo.routes').then((m) => m.demoRoutes),
    pathMatch: 'full',
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./app/privacy-policy/privacy-policy.component').then((m) => m.PrivacyPolicyComponent),
  },
];

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(RouterModule.forRoot(routes))],
}).catch((err) => console.error(err));
