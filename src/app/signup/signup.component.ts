import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {CustomValidator} from './custom-validator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registrationForm: FormGroup;
  errormessage: string;

  constructor(private auth: AuthService, public fb: FormBuilder) {
  }

  ngOnInit() {
    this.errormessage = '';
    this.auth.messageSubject.subscribe((message) => this.errormessage = message);
    this.registrationForm = this.fb.group({
      name: [null, Validators.required],
      password: [null, Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        CustomValidator.patternValidator(/\d/, {hasNumber: true}),
        // 3. check whether the entered password has upper case letter
        CustomValidator.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
        // 4. check whether the entered password has a lower-case letter
        CustomValidator.patternValidator(/[a-z]/, {hasSmallCase: true}),
        // 5. check whether the entered password has a special character
        CustomValidator.patternValidator(/[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/, {hasSpecialCharacters: true}),
        // 6. Has a minimum length of 8 characters],
        Validators.minLength(8)])],
      email: [null, Validators.compose([
        Validators.email,
        Validators.required])]
    });
  }

  signUp() {
    if (this.registrationForm.valid) {
      this.auth.signUp(this.registrationForm.value);
    }
  }

}
