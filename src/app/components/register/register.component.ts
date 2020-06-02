import { Component, OnInit, Input } from "@angular/core";
import { FormControl, Validators, FormBuilder } from "@angular/forms";
import { User } from "src/app/models/user";
import { MatSnackBar, MatRadioChange, MatRadioButton } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpService } from "src/app/service/http.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  name = new FormControl(this.user.name, [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  email = new FormControl("", [
    Validators.required,
    Validators.email,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
  ]);
  password = new FormControl(this.user.password, [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(15),
  ]);
  mobile = new FormControl(this.user.mobile, [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern("[6-9]\\d{9}"),
  ]);
  showSpinner = false;
  person = String;
  constructor(
    private snackBar: MatSnackBar,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private httpservice: HttpService
  ) {}

  ngOnInit() {}

  nameValidation() {
    return this.name.hasError("required") ? "must required" : "";
  }

  MobileNumber() {
    return this.mobile.hasError("required")
      ? "must required"
      : this.mobile.hasError("mobile")
      ? "Not a valid mobilenumber"
      : "";
  }

  emailValidation() {
    return this.email.hasError("required")
      ? "You must enter a value"
      : this.email.hasError("email")
      ? "Not a valid email"
      : "";
  }

  getErrorPassword() {
    return this.password.hasError("required")
      ? "You must enter a value"
      : this.password.hasError("password")
      ? "Min 6 Elements"
      : "";
  }
  favoriteSeason: string = 'user';
  seasons = [
    'user',
    'seller',
    "admin"
  ];
  onRegister() {
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.httpservice
        .postRequest(this.favoriteSeason + "/registration", this.user)
        .subscribe(
          (response: any) => {
            if (response.status==200 || response.status=="OK") {
              this.snackBar.open("verify your email before login", "undo", {
                duration: 3000,
              });
            } else {
              console.log(response);
              this.snackBar.open("Registration Failed", "undo", {
                duration: 2500,
              });
            }
          },
          (error: any) => {
            this.snackBar.open("something went wrong.....!", "undo", { duration: 2500 });
          }
        );
    }, 2000); //spinner
  }
}
