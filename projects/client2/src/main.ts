import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { enableProdMode, importProvidersFrom, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { GoogleOidcLoginModule, GoogleOidcLoginProvider } from '@jin-k/google-oidc-login-provider';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      GoogleOidcLoginModule.forProvider(environment.CLIENT_ID, 'openid profile email')
    ),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleOidcLoginProvider.PROVIDER_ID,
            provider: GoogleOidcLoginProvider,
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
}).catch((err) => console.error(err));
