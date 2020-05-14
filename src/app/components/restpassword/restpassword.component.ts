import { Component, OnInit } from "@angular/core";
import { Validators, FormControl } from "@angular/forms";
import { Setpassword } from "src/app/models/setpassword";
import { ActivatedRoute, Router } from "@angular/router";
import { BookService } from "src/app/service/book.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-restpassword",
  templateUrl: "./restpassword.component.html",
  styleUrls: ["./restpassword.component.scss"],
})
export class RestpasswordComponent implements OnInit {
  setpassword: Setpassword = new Setpassword();
  password = new FormControl(this.setpassword.password, [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(15),
  ]);
  cpassword = new FormControl("", [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(15),
  ]);
  constructor(
    private router: ActivatedRoute,
    private service: BookService,
    private matSnackBar: MatSnackBar,
    private route: Router
  ) {}

  ngOnInit() {}
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
  getErrorcPassword() {
    return this.password.hasError("required")
      ? "You must enter a value"
      : this.password.hasError("password")
      ? "Min 6 Elements"
      : "";
  }
  resetPassword() {
    let token = this.router.snapshot.paramMap.get("token");
    let role = this.router.snapshot.paramMap.get("role");
    const data = {
      password: this.password.value,
    };
    this.service.getReset(data, token, role).subscribe((result: any) => {
      console.log(result);
      this.matSnackBar.open("your password updated", "cancel", {
        duration: 5000,
      });
      this.route.navigate(["/login"]);
    });
  }
}
