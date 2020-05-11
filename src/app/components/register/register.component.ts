import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User = new User();

  name = new FormControl(this.user.name, [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z ]*')]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl(this.user.password, [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
  mobile = new FormControl(this.user.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
  showSpinner = false;
  constructor(private snackBar: MatSnackBar, 
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }
    private spinner: NgxSpinnerService
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
onSubmit()
{
  console.log(this.user)
  
  console.log(this.password)
localStorage.setItem("name",this.user.name)
localStorage.setItem("emailId",this.user.emailId)
localStorage.setItem("password",this.user.password)
localStorage.setItem("phoneNumber",this.user.phoneNumber)
// this.spinner.show();

        this.snackBar.open(
          "Registered Successfully",
          "undo",
          { duration: 5000 }
        )
       
        this.router.navigate(['/login'])
      
}



}