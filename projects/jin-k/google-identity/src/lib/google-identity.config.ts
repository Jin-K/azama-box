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
