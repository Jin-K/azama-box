import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { AuthConfig, AUTH_CONFIG, OAuthModule } from 'angular-oauth2-oidc';
import { GoogleIdentityService } from './google-identity.service';
import { GoogleIdentityConfig } from './google-identity.config';

@NgModule({
  imports: [OAuthModule.forRoot()],
  providers: [GoogleIdentityService],
})
export class GoogleIdentityModule {
  constructor(@Inject(AUTH_CONFIG) @Optional() authConfig: AuthConfig | null) {
    if (!authConfig) {
      throw new Error(
        'Provide `AUTH_CONFIG` yourself or import module with `.forRoot()` in your AppModule'
      );
    }
  }

  static forRoot(
    config: GoogleIdentityConfig
  ): ModuleWithProviders<GoogleIdentityModule> {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      redirectUri: window.location.origin,
      silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
      useSilentRefresh: true,
      clientId: config.clientId,
      scope:
        config.scopes instanceof Array
          ? config.scopes.filter((s) => s).join(' ')
          : config.scopes,
      logoutUrl:
        'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=' +
        window.location.origin,
      showDebugInformation: config.debug,
    };
    return {
      ngModule: GoogleIdentityModule,
      providers: [{ provide: AUTH_CONFIG, useValue: authConfig }],
    };
  }

  private toAuthConfig(googleConfig: GoogleIdentityConfig): AuthConfig {
    return {};
  }
}
