import { Inject, Injectable } from '@angular/core';
import { AuthConfig, AUTH_CONFIG, OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { filter, ReplaySubject, take } from 'rxjs';

@Injectable()
export class GoogleIdentityService {
  private readonly _loggedInSrc = new ReplaySubject<boolean>(1);

  readonly loggedIn$ = this._loggedInSrc.asObservable();

  constructor(
    @Inject(AUTH_CONFIG) authConfig: AuthConfig,
    private readonly _oAuthService: OAuthService
  ) {
    this._oAuthService.configure(authConfig);

    this._oAuthService.tokenValidationHandler = new JwksValidationHandler();

    this._oAuthService.loadDiscoveryDocument().then(() => {
      this._oAuthService.tryLoginImplicitFlow().then(() => {
        if (this._oAuthService.hasValidAccessToken()) {
          this._loggedInSrc.next(true);
          this.logUserProfile();
        } else this._loggedInSrc.next(false);

        this._oAuthService.events
          .pipe(
            filter((e) => e.type === 'token_received'),
            take(1)
          )
          .subscribe(() => {
            this._loggedInSrc.next(true);
            this.logUserProfile();
          });
      });
    });
  }

  logIn() {
    this._oAuthService.initLoginFlowInPopup();
  }

  logOff(revoke = false) {
    if (revoke) {
      this._oAuthService.revokeTokenAndLogout(false, true);
    } else {
      this._oAuthService.logOut();
    }
  }

  private logUserProfile() {
    this._oAuthService
      .loadUserProfile()
      .then((userProfile) => console.log(userProfile));
  }
}
