import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
// import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client1';

  constructor(
    @Inject(DOCUMENT) dom: Document
    // readonly authService: AuthService
  ) {
    // const scriptElem = dom.createElement('script');
    // scriptElem.src = 'https://accounts.google.com/gsi/client';
    // scriptElem.async = true;
    // scriptElem.defer = true;
    // scriptElem.onload = authService.initClient.bind(authService);
    // dom.body.appendChild(scriptElem);
  }

  login() {
    console.log('login()');
  }
}
