import {
  APP_INITIALIZER,
  Inject,
  ModuleWithProviders,
  NgModule,
  Optional,
} from '@angular/core';
import { AuthConfig, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { GoogleIdentityService } from './google-identity.service';
import { GoogleIdentityConfig } from './google-identity.config';
import { GOOGLE_IDENTITY_CONFIG } from './google-identity-config.token';

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
        'Provide `GOOGLE_IDENTITY_CONFIG` yourself or import module with `.forRoot()` in your AppModule'
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
    return {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      redirectUri: this.getOurUrl(),
      silentRefreshRedirectUri: this.getOurUrl() + '/silent-refresh.html',
      useSilentRefresh: true,
      clientId: config.clientId,
      scope:
        config.scopes instanceof Array
          ? config.scopes.filter((s) => s).join(' ')
          : config.scopes,
      logoutUrl:
        config.logoutFromGoogleMode === 'redirect'
          ? 'https://accounts.google.com/Logout?continue=https://appengine.google.com/_ah/logout?continue=' +
            this.getOurUrl()
          : 'https://accounts.google.com/Logout',
      showDebugInformation: config.debug,
    };
  }

  private static getOurUrl() {
    const origin = window.location.origin;
    const path = window.location.pathname;
    let result = origin + path;
    if (result.endsWith('/')) {
      result = result.substring(0, result.length - 1);
    }
    return result;
  }
}
