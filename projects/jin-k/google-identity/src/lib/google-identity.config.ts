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
   * The way we want to logout from Google for real.
   * If a mode is specified, a request will be done to https://accounts.google.com/Logout.
   * If no value is given, we only logout from our app, cleaning only the app storage
   */
  logoutFromGoogleMode?: 'redirect' | 'popup' | 'window';

  /**
   * Sets *angular-oauth2-oidc* `showDebugInformation` flag
   */
  debug?: boolean;
}
