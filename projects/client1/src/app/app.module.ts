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
      scopes: 'openid profile email',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
