import { LoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { Inject, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter, firstValueFrom, map } from 'rxjs';
import { GOOGLE_CLIENT_ID, GOOGLE_SCOPES } from './tokens';

@Injectable({ providedIn: 'root' })
export class GoogleOidcLoginProviderService implements LoginProvider {
  public static readonly PROVIDER_ID = 'GOOGLE_OIDC' as const;

  private readonly _tokenReceived$ = this._oAuthService.events.pipe(
    filter((e) => e.type === 'token_received'),
    map(() => true as const)
  );

  constructor(
    @Inject(GOOGLE_CLIENT_ID) clientId: string,
    @Inject(GOOGLE_SCOPES) scopes: string | string[],
    private readonly _oAuthService: OAuthService
  ) {
    let redirectUri = window.location.origin + window.location.pathname;
    if (redirectUri.endsWith('/')) {
      redirectUri = redirectUri.substring(0, redirectUri.length - 1);
    }

    this._oAuthService.configure({
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      redirectUri,
      silentRefreshRedirectUri: redirectUri,
      useSilentRefresh: true,
      clientId,
      scope: scopes instanceof Array ? scopes.filter((s) => s).join(' ') : scopes,
    });
  }

  async initialize(autoLogin?: boolean): Promise<void> {
    await this._oAuthService.loadDiscoveryDocument();
    if (autoLogin) {
      await this._oAuthService.tryLoginImplicitFlow();
    }
  }

  async getLoginStatus(): Promise<SocialUser> {
    if (this._oAuthService.hasValidIdToken()) {
      return this.createUser(this._oAuthService.getIdToken());
    } else {
      throw `No user is currently logged in with ${GoogleOidcLoginProviderService.PROVIDER_ID}`;
    }
  }

  async refreshToken(): Promise<SocialUser | null> {
    if (this._oAuthService.hasValidIdToken()) {
      await this._oAuthService.revokeTokenAndLogout(true, true);
    }
    return null;
  }

  async signIn(): Promise<SocialUser> {
    const tokenReceivedPromise = firstValueFrom(this._tokenReceived$);

    await this._oAuthService.initImplicitFlowInPopup();
    await tokenReceivedPromise;

    return this.createUser(this._oAuthService.getIdToken());
  }

  async signOut(revoke?: boolean): Promise<void> {
    if (revoke) {
      this._oAuthService.revokeTokenAndLogout(true, true);
    } else {
      this._oAuthService.logOut(true);
    }
  }

  async getAccessToken() {
    debugger;
  }

  private createUser(idToken: string): SocialUser {
    const user = new SocialUser();
    const payload = JSON.parse(window.atob(idToken.split('.')[1]));
    user.idToken = idToken;
    user.id = payload.sub;
    user.name = payload.name;
    user.email = payload.email;
    user.photoUrl = payload.picture;
    user.firstName = payload['given_name'];
    user.lastName = payload['family_name'];
    return user;
  }
}
