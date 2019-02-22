import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  messageSubject = new Subject<string>();

  constructor(private http: HttpClient) { }

  login(loginForm) {
    return this.http.post(environment.server + '/login', loginForm).subscribe(res => {
        if (res['token'] && res['userId']) {
          console.log('Successfully logged in');
          localStorage.setItem('token', res['token']);
          localStorage.setItem('userId', res['userId']);
        } else {
          this.messageSubject.next(res.message);
        }
      },
      error => {
      console.log(error);
      });
  }

  signUp(signUpFrom) {
    return this.http.put(environment.server + '/signup', signUpFrom, {observe: 'response'}).subscribe(resp => console.log(resp)
    , error => {
      console.log('Something went wrong: ', error.error.errors);
      this.messageSubject.next(error.error.errors[0].msg);
    });
  }
}
