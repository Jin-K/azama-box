import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleOidcLoginProvider } from '@jin-k/google-oidc-login-provider';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-demo',
  imports: [CommonModule],
  templateUrl: './demo.component.html',
  standalone: true,
})
export class DemoComponent {
  constructor(readonly authService: SocialAuthService) {
    this.authService.authState.subscribe(console.log);
  }

  logIn() {
    this.authService.signIn(GoogleOidcLoginProvider.PROVIDER_ID);
  }

  getAccessToken() {
    debugger;
    this.authService.getAccessToken(GoogleOidcLoginProvider.PROVIDER_ID);
  }

  logOff(revoke = false) {
    this.authService.signOut(revoke);
  }
}
