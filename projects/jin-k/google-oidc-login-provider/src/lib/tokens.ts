import { InjectionToken } from '@angular/core';

export const GOOGLE_CLIENT_ID = new InjectionToken<string>('GoogleClientId');
export const GOOGLE_SCOPES = new InjectionToken<string | string[]>('GoogleScopes');
