import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { GoogleIdentityConfig, GoogleIdentityModule } from '@jin-k/google-identity';

import { environment } from '../../environments/environment';
import { DemoComponent } from './demo.component';

const config: GoogleIdentityConfig = {
  clientId: environment.CLIENT_ID,
  scopes: [
    // 3 first scopes are for the id token (profile info)
    'openid',
    'profile',
    'email',

    // scopes below will be used to get the unique access token we want,
    // this scopes are registered & allowed in my google app
    'https://www.googleapis.com/auth/drive.file',
  ],
};

export const demoRoutes: Routes = [
  {
    path: '',
    providers: [importProvidersFrom(GoogleIdentityModule.forAuthConfig(config))],
    component: DemoComponent,
  },
];
