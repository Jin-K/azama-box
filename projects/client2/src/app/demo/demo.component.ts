import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleOidcLoginProvider } from '@jin-k/google-oidc-login-provider';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  readonly providerId = GoogleOidcLoginProvider.PROVIDER_ID;

  user: SocialUser | undefined;

  constructor(private readonly _authService: SocialAuthService) {}

  ngOnInit(): void {
    this._authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signInWithGoogle(): void {
    this._authService.signIn(this.providerId);
  }

  signOut(): void {
    this._authService.signOut();
  }

  refreshGoogleToken(): void {
    this._authService.refreshAuthToken(this.providerId);
  }
}
