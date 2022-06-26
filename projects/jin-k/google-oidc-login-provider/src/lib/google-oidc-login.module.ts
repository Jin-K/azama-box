import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OAuthModule } from 'angular-oauth2-oidc';
import { GOOGLE_CLIENT_ID, GOOGLE_SCOPES } from './tokens';

@NgModule({
  imports: [HttpClientModule, OAuthModule.forRoot()],
})
export class GoogleOidcLoginModule {
  static forProvider(
    clientId: string,
    scopes: string | string[]
  ): ModuleWithProviders<GoogleOidcLoginModule> {
    return {
      ngModule: GoogleOidcLoginModule,
      providers: [
        { provide: GOOGLE_CLIENT_ID, useValue: clientId },
        { provide: GOOGLE_SCOPES, useValue: scopes },
      ],
    };
  }
}
