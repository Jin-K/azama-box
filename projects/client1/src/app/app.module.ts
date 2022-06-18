import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleIdentityModule } from '@jin-k/google-identity';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleIdentityModule.forRoot({
      clientId: environment.CLIENT_ID,
      scopes: [
        // 3 first scopes are for the id token (profile info)
        'openid',
        'profile',
        'email',

        // scopes below will be used to get the unique access token we want,
        // this scopes are registered & allowed in my google app
        'https://www.googleapis.com/auth/drive.file',
      ],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
