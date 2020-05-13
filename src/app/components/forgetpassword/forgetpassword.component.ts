import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { ForgotPassword } from 'src/app/models/forgetpassword';
import { MatSnackBar, MatRadioChange } from '@angular/material';
import { HttpService } from 'src/app/service/http.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  forgot: ForgotPassword = new ForgotPassword();
  showSpinner = false;
  person=String;
  email = new FormControl(this.forgot.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]);
  constructor(private snackBar: MatSnackBar, private httpservice: HttpService,
    private spinner: NgxSpinnerService,) { }

  ngOnInit() {
  }
  emailValidation() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  onChange(mrChange: MatRadioChange) {
    console.log(mrChange.value);
   this.person=mrChange.value
  }
  onforgot() {
    this.spinner.show();
    console.log(this.forgot);
    this.httpservice.putRequestForget( this.person+"/forgetPassword?email=" + this.forgot.email, this.forgot).subscribe(
      (response: any) => {
        if (response!=null) {
          this.spinner.hide();
          console.log(response);
          this.snackBar.open(
            "Link sent", "undo",
            { duration: 2500 }
          )
        } else {
          console.log(response);
          this.snackBar.open(
            "Failed",
            "undo",
            { duration: 2500 }
          )
        }
      }
    )
  }

}

