import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { GoogleOidcLoginProvider } from '@jin-k/google-oidc-login-provider';

import { DemoComponent } from './demo.component';

export const demoRoutes: Routes = [
  {
    path: '',
    providers: [
      importProvidersFrom(
        SocialLoginModule.initialize({
          autoLogin: true,
          providers: [
            { id: GoogleOidcLoginProvider.PROVIDER_ID, provider: GoogleOidcLoginProvider },
          ],
        })
      ),
    ],
    component: DemoComponent,
  },
];
