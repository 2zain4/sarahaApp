import { Component, AfterViewInit } from '@angular/core';
import { Auth } from './services/auth';

declare const google: any;

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<div id="google-btn"></div>`
})
export class AppComponent implements AfterViewInit {
  constructor(private readonly authService: Auth) { }
  ngAfterViewInit() {
    google.accounts.id.initialize({
      client_id: "568015650805-914boe9gtbrddbinub74dlpghiv41fd6.apps.googleusercontent.com",
      callback: async (response: any) => {
        console.log('response:', response);
        console.log('ID TOKEN:', response.credential);
        await this.authService.googleLogin(response.credential)
      }
    });

    google.accounts.id.renderButton(
      document.getElementById('google-btn'),
      { theme: 'outline', size: 'large' }
    );
  }
}
