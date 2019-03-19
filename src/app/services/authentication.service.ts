import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  API_URL = 'http://localhost:8000/api/token/';


  // The BehaviorSubject has the characteristic that it stores the “current” value.
  // This means that you can always directly get the last emitted value from the BehaviorSubject.
  // You can create BehaviorSubjects with a start value.
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;
  private httpOptions: any;
  private helper: any;
  private client: User;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.helper = new JwtHelperService();
    this.client = new User();
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public clearSession(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.client = new User();
    this.currentUserSubject.next(null);

    this.router.navigate(['/login']);
  }

  login(mail: string, pass: string) {
    const body = JSON.stringify({ email: mail, password: pass });
    return this.http.post<any>(`${this.API_URL}`, body, this.httpOptions)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user['access']) {
          this.client.token = user['access'];
          this.client.id = this.helper.decodeToken(user['access'])['client_id'];
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ 'token': this.client.token, 'id': this.client.id }));
          this.currentUserSubject.next(this.client);
        }

        return user;
      }));
  }

  logout() {
    this.clearSession();
  }
}
