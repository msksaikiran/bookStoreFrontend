import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { HttpService } from "src/app/service/http.service";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { ViewcartService } from "src/app/service/viewcart.service";
import { MatSnackBar, MatDialog } from "@angular/material";
import { DataService } from "src/app/service/data.service";
import { UserService } from "src/app/service/user.service";
import { BooksComponent } from "../books/books.component";
import { LoginComponent } from "../login/login.component";
import { MatDialogModule } from "@angular/material/dialog";

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
    private data: DataService,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) {}

  visible: boolean;
  appName: string;
  profilepic: boolean = false;
  ngOnInit() {
    this.data.currentMessage.subscribe((message) => {
      if ((message = "count")) {
        this.getcountofbooks();
      } else if ((message = "removeBook")) {
        this.getcountofbooks();
      } else if ((message = "checkout")) {
        this.getcountofbooks();
      }
    });

    if (localStorage.getItem("token") != null) {
      this.visible = true;
    } else {
      this.profilepic = false;
    }
    this.getcountofbooks();
    this.getprofileLink();
    this.profile = localStorage.getItem("userimage");
  }

  onBook() {
    this.router.navigate(["books"]);
    //this.getcountofbooks();
  }
  showSpinner = false;
  onCart() {
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      if (localStorage.getItem("token") != null) {
        this.router.navigate(["books/viewcart"]);
      } else {
        const dialogRef = this.dialog.open(LoginComponent);
        dialogRef.afterClosed().subscribe((result) => {
          window.location.reload();
        });
        this.snackbar.open("please login", "ok", {
          duration: 1000,
        });
      }
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
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }
  onLogout() {
    localStorage.clear();
    this.visible = false;
    this.getcountofbooks();
    this.spinner.show();
    this.showSpinner = true;

    setTimeout(() => {
      this.spinner.hide();
      this.bookcount = 0;
      this.router.navigate(["/books"]);
      window.location.reload();
    }, 1000);
  }
  myInput = new FormControl();
  private obtainNotes = new BehaviorSubject([]);
  currentMessage = this.obtainNotes.asObservable();
  searching() {
    this.appName = "Search";
    this.httpservice
      .getMethod(
        environment.baseUrl + "book/bookorauthorname?text=" + this.searchText,
        this.httpservice.httpOptions
      )
      .subscribe((response: any) => {
        this.obtainNotes.next(response.obj);
        this.router.navigate(["/books/search"]);
      });
  }

  bookcount: any;
  token: string;
  // placeOrder: boolean = true;
  getcountofbooks() {
    this.token = localStorage.getItem("token");
    this.cartService
      .getRequest(environment.book_count_cart)
      .subscribe((Response: any) => {
        this.bookcount = Response.obj;
      });
  }

  profile: String;

  getprofileLink() {
    this.userService.getRequest(environment.user_profile).subscribe(
      (Response: any) => {
        this.profile = Response.obj;
        if (this.profile != null) {
          this.profilepic = true;
        }
      },
      (error: any) => {
        this.snackbar.open("", "undo", { duration: 2500 });
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
          this.profilepic = true;
          this.profile = response["msg"];
          ///  console.log("upload", response);
        });
    }
  }
}
