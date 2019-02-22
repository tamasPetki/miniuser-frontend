import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  messageSubject = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  login(loginForm) {
    return this.http.post(environment.server + '/login', loginForm).subscribe(res => {
        if (res['token'] && res['userId']) {
          console.log('Successfully logged in');
          localStorage.setItem('token', res['token']);
          localStorage.setItem('userId', res['userId']);
        } else {
          if (res.hasOwnProperty('message')) {
            const message = res['message'];
            this.messageSubject.next(message);
          }
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

  getToken() {
    return localStorage.getItem('token');
  }

  public isAuthenticated() {
    const token = this.getToken();
    return tokenNotExpired(null, token);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

}
