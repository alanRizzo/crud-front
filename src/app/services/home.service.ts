import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';

import { AuthenticationService } from './authentication.service';
import { User } from '../models/user';
import { Move } from '../models/move';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  API_URL = 'http://localhost:8000/api/';

  private currentAccount: ReplaySubject<number>;
  public currentAccount$: Observable<number>;
  private currentMove: BehaviorSubject<Move>;
  public currentMove$: Observable<Move>;
  private httpOptions: any;
  private user: User;

  constructor(
    private http: HttpClient,
    authenticationService: AuthenticationService
  ) {
    this.currentAccount = new ReplaySubject<number>();
    this.currentAccount$ = this.currentAccount.asObservable();
    this.currentMove = new BehaviorSubject<Move>({
      id: 0,
      description: '',
      amount: 0,
      date: null
    });
    this.currentMove$ = this.currentMove.asObservable();
    this.user = authenticationService.currentUserValue;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + this.user.token
      })
    };
  }

  setAccountId(id: number) {
    this.currentAccount.next(id);
  }

  setMove(move: Move) {
    this.currentMove.next(move);
  }

  accounts() {
    return this.http.get(`${this.API_URL}accounts/`, this.httpOptions);
  }

  client() {
    return this.http.get(
      `${this.API_URL}clients/${this.user.id}/`,
      this.httpOptions
    );
  }

  addMovement(description: string, account: number, amount: number) {
    const body = JSON.stringify({
      description: description,
      account: account,
      amount: amount
    });
    return this.http.post(`${this.API_URL}movements/`, body, this.httpOptions);
  }

  editMovement(description: string, id: number, amount: number) {
    const body = {
      description: description,
      amount: amount
    };
    return this.http.patch(`${this.API_URL}movements/${id}/`, body, this.httpOptions);
  }

  deleteMovement(id: number) {
    return this.http.delete(`${this.API_URL}movements/${id}/`, this.httpOptions);
  }
}
