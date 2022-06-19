import {
  APP_INITIALIZER,
  Inject,
  InjectionToken,
  ModuleWithProviders,
  NgModule,
  Optional,
} from '@angular/core';
import { AuthConfig, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { GoogleIdentityService } from './google-identity.service';
import { GoogleIdentityConfig } from './google-identity.config';

const GOOGLE_IDENTITY_CONFIG = new InjectionToken<GoogleIdentityConfig>(
  'GOOGLE_IDENTITY_CONFIG'
);

@NgModule({
  imports: [OAuthModule.forRoot()],
  providers: [GoogleIdentityService],
})
export class GoogleIdentityModule {
  constructor(
    @Inject(GOOGLE_IDENTITY_CONFIG)
    @Optional()
    config: GoogleIdentityConfig | null
  ) {
    if (!config) {
      throw new Error(
        'You should import GoogleIdentityModule.forRoot() in your AppModule'
      );
    }
  }

  static forRoot(
    config: GoogleIdentityConfig
  ): ModuleWithProviders<GoogleIdentityModule> {
    return {
      ngModule: GoogleIdentityModule,
      providers: [
        { provide: GOOGLE_IDENTITY_CONFIG, useValue: config },
        {
          provide: APP_INITIALIZER,
          useFactory: (oAuthService: OAuthService) => async () => {
            oAuthService.configure(this.createAuthConfig(config));
            await oAuthService.loadDiscoveryDocument();
            return await oAuthService.tryLoginImplicitFlow();
          },
          multi: true,
          deps: [OAuthService],
        },
      ],
    };
  }

  private static createAuthConfig(config: GoogleIdentityConfig): AuthConfig {
    let url = window.location.origin + window.location.pathname;
    if (url.endsWith('/')) {
      url = url.substring(0, url.length - 1);
    }

    return {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      redirectUri: url,
      silentRefreshRedirectUri: url + '/silent-refresh.html',
      useSilentRefresh: true,
      clientId: config.clientId,
      scope:
        config.scopes instanceof Array
          ? config.scopes.filter((s) => s).join(' ')
          : config.scopes,
      showDebugInformation: config.debug,
    };
  }
}
