import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Login } from "src/app/models/login";
import { MatSnackBar, MatRadioChange } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpService } from "src/app/service/http.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  /**
   * login object about consist of
   * 1)email
   * 2)password feilds
   */
  login: Login = new Login("", "");
  loginForm: FormGroup;
  token: string;
  email = new FormControl(this.login.mailOrMobile, [
    Validators.required,
    Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
  ]);
  password = new FormControl(this.login.password, [
    Validators.required,
    Validators.minLength(8),
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
  /**
   * Email validation
   */
  getErrorEmail() {
    return this.email.hasError("required")
      ? "You must enter a value"
      : this.email.hasError("email")
      ? "Not a valid email"
      : "";
  }
  /**
   * Password Validation
   */
  getErrorPassword() {
    return this.password.hasError("required")
      ? "You must enter a value"
      : this.password.hasError("password")
      ? "Min 6 Elements"
      : "";
  }
  onChange(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    this.person = mrChange.value;
  }
  onlogin() {
    this.spinner.show();
    console.log(this.person + "/login:" + this.login.mailOrMobile);

    this.httpservice
      .postRequest(this.person + "/login", this.login)
      .subscribe((response: any) => {
        if (response != null) {
          this.spinner.hide();
          console.log(response);
          console.log(response.obj);
          localStorage.setItem("token", response.obj);
          this.token = localStorage.getItem("token");
          console.log(this.token);
          localStorage.setItem("email", response.mailOrMobile);
          this.snackBar.open(
            "Login Successfull",
            "undo",

            { duration: 2500 }
          );
        } else {
          this.spinner.hide();
          console.log(response);
          console.log("Login:" + this.login.mailOrMobile);
          this.snackBar.open("Login Failed", "undo", { duration: 2500 });
        }
      });
  }
}
