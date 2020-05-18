import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { HttpService } from "src/app/service/http.service";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { ViewcartService } from "src/app/service/viewcart.service";
import { MatSnackBar } from "@angular/material";
import { DataService } from "src/app/service/data.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  searchText: any;
  constructor(
    private route: ActivatedRoute,
    private httpservice: HttpService,
    private spinner: NgxSpinnerService,
    private cartService: ViewcartService,
    private userService: UserService,
    private data: DataService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  visible: boolean;
  ngOnInit() {
    if (localStorage.getItem("token") != null) {
      this.visible = true;
    }
    this.getcountofbooks();
    this.getprofileLink();
    this.profile = localStorage.getItem('userimage');
  }

  onBook() {
    this.router.navigate(["books"]);
    this.getcountofbooks();
  }
  showSpinner = false;
  onCart() {
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.getcountofbooks();
      this.router.navigate(["books/viewcart"]);
    }, 1000);
  }
  onwhishlist() {
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(["books/whishlist"]);
    }, 1000);
  }
  onOrderDetails() {
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(["books/orderdetails"]);
    }, 1000);
  }
  onLogin() {
    this.router.navigate(["login"]);
  }
  onLogout() {
    localStorage.clear();
    this.visible = false;
    this.getcountofbooks();
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(["books"]);
    }, 1000);
  }

  searching(searchText: any) {
    this.router.navigate(["/books/search"], {
      queryParams: { searchText: searchText },
    });
  }

  bookcount: number;
  token: string;
  // placeOrder: boolean = true;
  getcountofbooks() {
    console.log("cart.......");
    this.token = localStorage.getItem("token");
    this.cartService.getRequest(environment.book_count_cart).subscribe(
      (Response: any) => {
        this.bookcount = Response.obj;
        // if (this.bookcount == 0) {
        //   this.placeOrder = false;
        // }
      },
      (error: any) => {
        //console.error(error);
        console.log(error.error.message);
        this.snackbar.open(error.error.message, "undo", { duration: 2500 });
      }
    );
  }

  profile: String;
  getprofileLink() {
    this.userService.getRequest(environment.user_profile).subscribe(
      (Response: any) => {
        this.profile = Response.obj;
        // if (this.bookcount == 0) {
        //   this.placeOrder = false;
        // }
      },
      (error: any) => {
        //console.error(error);
        console.log(error.error.message);
        this.snackbar.open(error.error.message, "undo", { duration: 2500 });
      }
    );
  }
  file: File;
  fileChange(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      let body = new FormData();
      body.append("file", this.file);
      this.httpservice
        .postMethod(
          `${environment.baseUrl + environment.PROFILE_CHANGE_OR_UPLOAD}` +
            "/" +
            localStorage.getItem("token"),
          body,
          {}
        )
        .subscribe((response: any) => {
          localStorage.setItem("userprofile", response["msg"]);
          this.profile = response["msg"];
          console.log("upload", response);
        });
    }
  }
}
