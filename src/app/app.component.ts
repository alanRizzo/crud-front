import { Component } from '@angular/core';

import { AuthenticationService } from './services/authentication.service';

import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;

  constructor( private authenticationService: AuthenticationService ) {
    this.authenticationService.currentUser$.subscribe(x => this.currentUser = x);
  }

}
