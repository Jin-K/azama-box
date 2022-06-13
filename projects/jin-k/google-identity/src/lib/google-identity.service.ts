import { Inject, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  ReplaySubject,
} from 'rxjs';
import { GOOGLE_IDENTITY_CONFIG } from './google-identity-config.token';
import { GoogleIdentityConfig } from './google-identity.config';

@Injectable()
export class GoogleIdentityService {
  private readonly _loggedInSrc = new ReplaySubject<boolean>(1);
  private readonly _userProfileSrc = new BehaviorSubject<object | null>(null);

  readonly loggedIn$ = this._loggedInSrc.pipe(distinctUntilChanged());
  readonly userProfile$ = this._userProfileSrc.asObservable();

  constructor(
    @Inject(GOOGLE_IDENTITY_CONFIG)
    private readonly _config: GoogleIdentityConfig,
    private readonly _oAuthService: OAuthService
  ) {
    this._loggedInSrc.next(this._oAuthService.hasValidAccessToken());

    this._oAuthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe(() => this._loggedInSrc.next(true));

    this.loggedIn$
      .pipe(filter((loggedIn) => loggedIn))
      .subscribe(() =>
        this._oAuthService
          .loadUserProfile()
          .then((userProfile) =>
            this._userProfileSrc.next((userProfile as { info: object }).info)
          )
      );
  }

  logIn() {
    this._oAuthService.initLoginFlowInPopup();
  }

  logOff(revoke = false) {
    const mode = this._config.logoutFromGoogleMode;
    const noRedirect = mode !== 'redirect';

    if (revoke) {
      this._oAuthService.revokeTokenAndLogout(noRedirect, true);
    } else {
      this._oAuthService.logOut(noRedirect);
    }

    switch (mode) {
      case 'window':
      case 'popup':
        const features =
          mode === 'popup' ? this.calculatePopupFeatures() : void 0;
        const wnd = window.open(this._oAuthService.logoutUrl, void 0, features);
        setTimeout(() => {
          wnd?.close();
          this._loggedInSrc.next(false);
        }, 250);
        break;
      default:
        this._loggedInSrc.next(false);
        break;
    }
  }

  private calculatePopupFeatures() {
    // Specify an static height and width and calculate centered position
    const height = 470;
    const width = 500;
    const left = window.screenLeft + (window.outerWidth - width) / 2;
    const top = window.screenTop + (window.outerHeight - height) / 2;
    return `location=no,toolbar=no,width=${width},height=${height},top=${top},left=${left}`;
  }
}
