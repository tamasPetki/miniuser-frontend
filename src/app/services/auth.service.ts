import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginForm) {
    return this.http.post(environment.server + '/login', loginForm).subscribe(res => {
        if (res['token'] && res['userId']) {
          console.log('Successfully logged in');
          localStorage.setItem('token', res['token']);
          localStorage.setItem('userId', res['userId']);
        } else {
          console.log(res);
        }
      },
      error1 => console.log(error1));
  }
}
