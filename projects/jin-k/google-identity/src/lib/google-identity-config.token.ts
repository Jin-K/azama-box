import { InjectionToken } from '@angular/core';
import { GoogleIdentityConfig } from './google-identity.config';

export const GOOGLE_IDENTITY_CONFIG = new InjectionToken<GoogleIdentityConfig>(
  'GOOGLE_IDENTITY_CONFIG'
);
