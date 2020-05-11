import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { ForgotPassword } from 'src/app/models/forgetpassword';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  forgot: ForgotPassword = new ForgotPassword();

  email = new FormControl(this.forgot.emailId, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]);
  constructor() { }

  ngOnInit() {
  }
  emailValidation() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
}
