import { Component } from '@angular/core';
import { GoogleIdentityService } from '@jin-k/google-identity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly connected$: Observable<boolean>;

  constructor(private readonly _googleIdentityService: GoogleIdentityService) {
    this.connected$ = this._googleIdentityService.loggedIn$;
  }

  logIn() {
    this._googleIdentityService.logIn();
  }

  logOff() {
    this._googleIdentityService.logOff();
  }
}
