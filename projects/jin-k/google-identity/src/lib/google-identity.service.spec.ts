import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { GoogleIdentityModule } from './google-identity.module';

import { GoogleIdentityService } from './google-identity.service';

describe('GoogleIdentityService', () => {
  let service: GoogleIdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GoogleIdentityModule.forRoot({ clientId: '', scopes: '' }), HttpClientModule],
    });
    service = TestBed.inject(GoogleIdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
