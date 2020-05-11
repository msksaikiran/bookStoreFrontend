import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { Login } from "src/app/models/login";

@Component({
  selector: "app-view-cart",
  templateUrl: "./view-cart.component.html",
  styleUrls: ["./view-cart.component.scss"],
})
export class ViewCartComponent implements OnInit {
  images = [{}, {}, {}, {}];
  image: "assets/images/Image 11@2x.png";
  login: Login = new Login("", "");

  name = new FormControl([
    Validators.required,
    Validators.minLength(4),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  mobile = new FormControl([
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);
  pincode = new FormControl([
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(6),
  ]);

  locality = new FormControl([
    Validators.required,
    Validators.minLength(10),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  address = new FormControl([
    Validators.required,
    Validators.minLength(8),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  city = new FormControl([
    Validators.required,
    Validators.minLength(10),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  landmark = new FormControl([
    Validators.required,
    Validators.minLength(10),
    Validators.pattern("[a-zA-Z ]*"),
  ]);

  nameValidation() {
    return this.name.hasError("required") ? "" : "";
  }
  phoneNumber() {
    return this.mobile.hasError("required") ? "" : "";
  }
  pincodeValidation() {
    return this.name.hasError("required") ? "" : "";
  }
  localityValidation() {
    return this.locality.hasError("required") ? "" : "";
  }
  addressValidation() {
    return this.address.hasError("required") ? "" : "";
  }
  cityValidation() {
    return this.city.hasError("required") ? "" : "";
  }
  landmarkValidation() {
    return this.landmark.hasError("required") ? "" : "";
  }

  // password = new FormControl(this.login.password, [
  //   Validators.required,
  //   Validators.minLength(7)
  // ]);
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  open: boolean;
  fields: boolean;
  onOpen() {
    this.open = true;
    this.fields = true;
  }

  showSpinner = false;
  open2: boolean;

  onOpen2() {
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.open2 = true;
    }, 2000);
    this.fields = false;
    console.log(this.login.email + "*****************");
  }
  onEdit() {
    this.fields = true;
    this.open2 = false;
  }
  onCheckOut() {
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(["/ordersucess"]);
    }, 2000);
  }
}
