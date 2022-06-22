/**
 * Configuration object for GoogleIdentityModule
 */
export interface GoogleIdentityConfig {
  /**
   * The Google OAuth2 client ID
   */
  clientId: string;

  /**
   * The scopes for the idToken & accessToken
   */
  scopes: string | string[];

  /**
   * Sets *angular-oauth2-oidc* `showDebugInformation` flag
   */
  debug?: boolean;
}

export interface GoogleIdTokenPayload {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  at_hash?: string;
  azp?: string;
  email?: string;
  email_verified?: boolean;
  family_name?: string;
  given_name?: string;
  hd?: string;
  locale?: string;
  name?: string;
  nonce?: string;
  picture?: string;
  profile?: string;
}
