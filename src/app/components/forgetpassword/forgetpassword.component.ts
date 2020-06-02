import { Component, OnInit } from "@angular/core";
import { Validators, FormControl } from "@angular/forms";
import { ForgotPassword } from "src/app/models/forgetpassword";
import { MatSnackBar } from "@angular/material";
import { HttpService } from "src/app/service/http.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-forgetpassword",
  templateUrl: "./forgetpassword.component.html",
  styleUrls: ["./forgetpassword.component.scss"],
})
export class ForgetpasswordComponent implements OnInit {
  forgot: ForgotPassword = new ForgotPassword();
  showSpinner = false;
  person = String;
  email = new FormControl(this.forgot.email, [
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
  ]);
  constructor(
    private snackBar: MatSnackBar,
    private httpservice: HttpService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {}
  emailValidation() {
    return this.email.hasError("required")
      ? "You must enter a value"
      : this.email.hasError("email")
      ? "Not a valid email"
      : "";
  }
  
  // @ViewChild('radio1', {static: true})
  // public radio1: RadioButtonComponent;
  // @ViewChild('radio2', {static: true})
  // public radio2: RadioButtonComponent;
  // public changeOption1 (args: ChangeEventArgs) {
  //     document.getElementById('text').innerText = 'Selected : ' + this.radio1.label;
  // }
  // public changeOption2 (args: ChangeEventArgs) {
  //     document.getElementById('text').innerText = 'Selected : ' + this.radio2.label;
  // }

  favoriteSeason: string = 'user';
  seasons = [
    'user',
    'seller',
    "admin"
  ];
 
  onforgot() {
    this.showSpinner = true;
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.httpservice
        .putRequestForget(
          this.favoriteSeason+ "/forgetPassword?email=" + this.forgot.email,
          this.forgot
        )
        .subscribe(
          (response: any) => {
            if (response != null) {
              this.spinner.hide();
              this.snackBar.open("Link sent", "undo", { duration: 2500 });
            } else {
              this.snackBar.open("Failed", "undo", { duration: 2500 });
            }
          },
          (error: any) => {
            // console.error(error);
            // console.log(error.error.message);
            this.snackBar.open(error.error.message, "undo", { duration: 2500 });
          }
        );
    }, 2000); //spinner
  }
}
