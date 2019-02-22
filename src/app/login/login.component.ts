import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  errorMessage: string;

  constructor(public fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.errorMessage = '';
    this.auth.messageSubject.subscribe((message) => this.errorMessage = message);
    this.loginForm = this.fb.group({
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  loginUser() {
    this.auth.login(this.loginForm.value);
  }
}
