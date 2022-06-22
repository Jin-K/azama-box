import { Component } from '@angular/core';
import { GoogleIdentityService } from '@jin-k/google-identity';
import { notNullOrUndefined } from '@jin-k/utils';
import { Observable, pluck, shareReplay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly connected$: Observable<boolean>;
  readonly picture$: Observable<string>;

  constructor(private readonly _googleIdentityService: GoogleIdentityService) {
    this.connected$ = this._googleIdentityService.loggedIn$.pipe(
      shareReplay(1)
    );
    this.picture$ = this._googleIdentityService.userProfile$.pipe(
      notNullOrUndefined(),
      pluck('picture'),
      notNullOrUndefined(),
      shareReplay(1)
    );
  }

  logIn() {
    this._googleIdentityService.logIn();
  }

  logOff(revoke = false) {
    this._googleIdentityService.logOff(revoke);
  }
}
