import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { MatSnackBar, MatRadioChange, MatRadioButton } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 
  user: User = new User();
nam=new FormControl('', );
  name = new FormControl(this.user.name, [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z ]*')]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl(this.user.password, [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
  mobile = new FormControl(this.user.mobile, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
  showSpinner = false;
  person=String;
  constructor(private snackBar: MatSnackBar, 
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private httpservice:HttpService) { }
    
  ngOnInit() {
    
  }

  nameValidation() {
    return this.name.hasError('required') ? 'must required' : '';
  }

  MobileNumber() {
    return this.mobile.hasError('required') ? 'must required' : '';
  }

  emailValidation() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorPassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('password') ? 'Min 6 Elements' : '';
  }
  onChange(mrChange: MatRadioChange) {
    console.log(mrChange.value);
   this.person=mrChange.value
  }
  onRegister()
{
  console.log("==========");
  console.log(this.person);
  this.showSpinner=true;
  console.log(this.user)
  this.spinner.show();
    console.log(this.password)

    this.httpservice.postRequest(this.person+"/registration", this.user).subscribe(
      (response: any) => {
        if (response!=null) {
          console.log(response);
          this.spinner.hide();
          this.snackBar.open(
            "Link sent to mail for verification",
            "undo",
            { duration: 3000 }
          )
          // this.router.navigate(['/login'])
        } else {
          console.log(response);
          this.snackBar.open(
            "Registration Failed",
            "undo",
            { duration: 2500 }
          )
        }

      }
    )
  }
}

