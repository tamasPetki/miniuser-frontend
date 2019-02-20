import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  errorMessage: string;

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      password: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  loginUser() {
    // TODO implement
  }
}
