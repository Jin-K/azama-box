import { importProvidersFrom } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { GoogleOidcLoginModule } from '@jin-k/google-oidc-login-provider';

import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(appRoutes),
      GoogleOidcLoginModule.forProvider(environment.CLIENT_ID, 'openid profile email')
    ),
  ],
}).catch((err) => console.error(err));
