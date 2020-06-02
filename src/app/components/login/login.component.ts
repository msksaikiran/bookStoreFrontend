import { Component, OnInit, Input, Inject } from "@angular/core";
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Login } from "src/app/models/login";
import {
  MatSnackBar,
  MatRadioChange,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material";
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
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
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
    private httpservice: HttpService,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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
  diableRadios = true;
  favoriteSeason: string = "user";
  seasons = ["user", "seller", "admin"];
  isDisabled: boolean = true;
  onlogin() {
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.httpservice
        .postRequest(this.favoriteSeason + "/login", this.login)
        .subscribe(
          (response: any) => {
            if (response.status == 200) {
              this.spinner.hide();

              this.token = localStorage.getItem("token");
              console.log(this.token);
              this.snackBar.open("Login Successfull", "undo", {
                duration: 2500,
              });
              if (this.favoriteSeason == "user") {
                localStorage.setItem("token", response.obj);
                this.dialogRef.close();
                this.router.navigate(["books"]);
              }
              if (this.favoriteSeason == "seller") {
                localStorage.setItem("token", response.obj);
                this.dialogRef.close();
                this.router.navigate(["seller/books"]);
              } else if (this.favoriteSeason == "admin") {
                localStorage.setItem("token", response.obj);
                this.dialogRef.close();
                this.router.navigate(["admin/books"]);
              }
            } else {
              this.spinner.hide();
              this.snackBar.open("Login Failed", "undo", { duration: 2500 });
            }
          },
          (error: any) => {
            this.snackBar.open(error.error.message, "undo", { duration: 2500 });
          }
        );
    }, 2000); //spinner
  }
}
