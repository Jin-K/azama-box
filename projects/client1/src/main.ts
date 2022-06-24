import { importProvidersFrom } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { GoogleIdentityModule } from '@jin-k/google-identity';

import { AppComponent } from './app/app.component';
import { DemoComponent } from './app/demo/demo.component';
import { PrivacyPolicyComponent } from './app/privacy-policy/privacy-policy.component';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
    pathMatch: 'full',
  },
  {
    path: 'privacy',
    component: PrivacyPolicyComponent,
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      GoogleIdentityModule.forRoot({
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
      })
    ),
  ],
}).catch((err) => console.error(err));
