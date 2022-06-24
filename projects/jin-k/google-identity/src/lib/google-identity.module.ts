import { HttpClientModule } from '@angular/common/http';
import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { AuthConfig, AUTH_CONFIG, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { GoogleIdentityService } from './google-identity.service';
import { GoogleIdentityConfig } from './types';

@NgModule({
  imports: [HttpClientModule, OAuthModule.forRoot()],
  providers: [GoogleIdentityService],
})
export class GoogleIdentityModule {
  constructor(
    @Inject(AUTH_CONFIG) @Optional() config: AuthConfig | null,
    oAuthService: OAuthService
  ) {
    if (!config) throw new Error('You should import GoogleIdentityModule.forConfig()');
    oAuthService.configure(config);
  }

  static forAuthConfig(config: GoogleIdentityConfig): ModuleWithProviders<GoogleIdentityModule> {
    return {
      ngModule: GoogleIdentityModule,
      providers: [{ provide: AUTH_CONFIG, useFactory: () => this.createAuthConfig(config) }],
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
        config.scopes instanceof Array ? config.scopes.filter((s) => s).join(' ') : config.scopes,
      showDebugInformation: config.debug,
    };
  }
}
