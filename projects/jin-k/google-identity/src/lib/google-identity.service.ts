import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, distinctUntilChanged, filter, ReplaySubject } from 'rxjs';
import { GoogleIdTokenPayload } from './types';

const userProfileHasInfo = (userProfile: object): userProfile is { info: GoogleIdTokenPayload } =>
  (userProfile as { info?: unknown }).info instanceof Object;

@Injectable()
export class GoogleIdentityService {
  private readonly _loggedInSrc = new ReplaySubject<boolean>(1);
  private readonly _userProfileSrc = new BehaviorSubject<GoogleIdTokenPayload | null>(null);

  readonly loggedIn$ = this._loggedInSrc.pipe(distinctUntilChanged());
  readonly userProfile$ = this._userProfileSrc.asObservable();

  constructor(private readonly _oAuthService: OAuthService) {
    this.init();
  }

  logIn() {
    this._oAuthService.initLoginFlowInPopup();
  }

  logOut(revoke = false) {
    if (revoke) {
      this._oAuthService.revokeTokenAndLogout(true, true);
    } else {
      this._oAuthService.logOut(true);
    }

    this._loggedInSrc.next(false);
  }

  getAccessToken() {
    return this._oAuthService.getAccessToken();
  }

  private async init() {
    await this._oAuthService.loadDiscoveryDocument();
    await this._oAuthService.tryLoginImplicitFlow();

    this._loggedInSrc.next(
      this._oAuthService.hasValidIdToken() && this._oAuthService.hasValidAccessToken()
    );

    this._oAuthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe(() => this._loggedInSrc.next(true));

    this.loggedIn$.pipe(filter((loggedIn) => loggedIn)).subscribe(() =>
      this._oAuthService.loadUserProfile().then((userProfile) => {
        if (userProfileHasInfo(userProfile)) {
          this._userProfileSrc.next(userProfile.info);
        }
      })
    );
  }
}
