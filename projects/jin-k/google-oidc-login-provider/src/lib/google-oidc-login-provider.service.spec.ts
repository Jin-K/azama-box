import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { OAuthModule } from 'angular-oauth2-oidc';
import { GoogleOidcLoginProviderService } from './google-oidc-login-provider.service';
import { GOOGLE_CLIENT_ID, GOOGLE_SCOPES } from './tokens';

describe('GoogleOidcLoginProviderService', () => {
  let service: GoogleOidcLoginProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, OAuthModule.forRoot()],
      providers: [
        { provide: GOOGLE_CLIENT_ID, useValue: '' },
        { provide: GOOGLE_SCOPES, useValue: '' },
      ],
    });
    service = TestBed.inject(GoogleOidcLoginProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
