import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private client!: google.accounts.oauth2.TokenClient;
  private access_token!: string;

  initClient() {
    this.client = google.accounts.oauth2.initTokenClient({
      client_id: environment.GAPI_CLIENT_ID,
      scope:
        'https://www.googleapis.com/auth/drive.file \
              https://www.googleapis.com/auth/calendar.readonly \
              https://www.googleapis.com/auth/drive.metadata \
              https://www.googleapis.com/auth/drive.readonly \
              https://www.googleapis.com/auth/drive.activity.readonly',
      callback: (tokenResponse) => {
        this.access_token = tokenResponse.access_token;
      },
    });
  }

  getToken() {
    this.client.requestAccessToken();
  }

  revokeToken() {
    google.accounts.oauth2.revoke(this.access_token, () => {
      console.log('access token revoked');
    });
  }

  loadCalendar() {
    var xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      'https://www.googleapis.com/calendar/v3/calendars/primary/events'
    );
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
    xhr.send();
  }
}
