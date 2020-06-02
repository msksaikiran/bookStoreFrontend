import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar, MatDialog, MatDialogConfig } from "@angular/material";
import { AddressService } from "src/app/service/address.service";
import { Book } from "src/app/models/book";
import { environment } from "src/environments/environment";
import { UserService } from "src/app/service/user.service";
import { HttpService } from "src/app/service/http.service";
import { VerifyconfrimComponent } from "../verifyconfrim/verifyconfrim.component";
import { Seller } from "src/app/models/seller";
import { BookService } from "src/app/service/book.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private httpservice: HttpService,
    private userService: UserService,
    public dialog: MatDialog,
    private bookService: BookService,
    private addressService: AddressService
  ) {}

  visible: boolean;
  profilepic: boolean = false;
  profile: any;
  ngOnInit() {
    if (localStorage.getItem("token") != null) {
      this.visible = true;
    } else {
      this.profilepic = false;
    }

    this.unverifiedBooks();

    this.profile = localStorage.getItem("userimage");
  }

  token: String;
  books: Array<Book> = [];
  bookdto: Seller = new Seller();
  unVerifiedBooks: [];
  unverifiedBooks() {
    this.userService
      .getRequest("/book/bookdetails/unverified")
      .subscribe((Response: any) => {
        this.unVerifiedBooks = Response.obj;
        //console.log(Response.obj);
        // for (var len in Response.obj) {
        // this.userService
        //   .getRequest("seller/singleSeller/" + Response.obj[0]["sellerId"])
        //   .subscribe((Res: any) => {
        //     for (var len in Response.obj) {
        //       this.bookdto = Response.obj[len];
        //       this.bookdto.sellerName = Res.obj.sellerName;
        //       this.bookdto.sellerEmail = Res.obj.email;
        //       this.bookdto.sellerMobile = Res.obj.mobile;
        //       this.books.push(this.bookdto);
        //     }
        //   });
        //}
      });
  }

  both: boolean = true;
  disapprove: boolean = false;
  approve: boolean = false;
  onDisApprove(book: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      bookId: book.bookId,
      status: "DisApprove",
    };
    const dialogRef = this.dialog.open(VerifyconfrimComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.books.splice(0);
      this.unverifiedBooks();
    });
  }

  status: any;
  onApprove(book: any) {
    console.log(book);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      bookId: book.bookId,
      status: "Approve",
    };
    const dialogRef = this.dialog.open(VerifyconfrimComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.books.splice(0);
      this.unverifiedBooks();
    });
  }

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
          console.log("upload", response);
        });
    }
  }
}
