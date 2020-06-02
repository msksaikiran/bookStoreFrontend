import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpService } from "src/app/service/http.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-verify",
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.scss"],
})
export class VerifyComponent implements OnInit {
  ngOnInit() {}
  showSpinner = false;
  constructor(
    private snackBar: MatSnackBar,
    private httpservice: HttpService,
    private spinner: NgxSpinnerService,
    private router: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private route: Router
  ) {}

  onverify() {
    let token = this.router.snapshot.paramMap.get("token");
    let role = this.router.snapshot.paramMap.get("role");
    {
      this.spinner.show();
      this.showSpinner = true;
      setTimeout(() => {
        this.spinner.hide();
        this.httpservice
          .putRequestverify(role, token)
          .subscribe((response: any) => {
            if (response != null) {
              this.spinner.hide();
              console.log(response);
              this.snackBar.open("verified", "undo", { duration: 2500 });
              this.route.navigate(["/login"]);
            } else {
              console.log(response);
              this.snackBar.open("Failed", "undo", { duration: 2500 });
            }
          });
      }, 2000);
    }
  }
}
