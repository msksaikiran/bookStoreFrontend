import { Component, OnInit } from "@angular/core";

import { MatSnackBar, MatDialog, MatDialogConfig } from "@angular/material";

import { Book } from "src/app/models/book";

import { UserService } from "src/app/service/user.service";

import { Seller } from "src/app/models/seller";

@Component({
  selector: "app-dis-approved-books",
  templateUrl: "./dis-approved-books.component.html",
  styleUrls: ["./dis-approved-books.component.scss"],
})
export class DisApprovedBooksComponent implements OnInit {
  constructor(private userService: UserService, public dialog: MatDialog) {}

  visible: boolean;
  profilepic: boolean = false;
  profile: any;
  ngOnInit() {
    this.unverifiedBooks();
  }

  token: String;
  books: Array<Book> = [];
  bookdto: Seller = new Seller();
  unVerifiedBooks: [];
  unverifiedBooks() {
    this.userService
      .getRequest("/book/bookdetails/unverified")
      .subscribe((Response: any) => {
        this.userService
          .getRequest("seller/singleSeller/" + Response.obj[0]["sellerId"])
          .subscribe((Res: any) => {
            for (var len in Response.obj) {
              this.bookdto = Response.obj[len];
              this.bookdto.sellerName = Res.obj.sellerName;
              this.bookdto.sellerEmail = Res.obj.email;
              this.bookdto.sellerMobile = Res.obj.mobile;
              this.books.push(this.bookdto);
            }
          });
      });
  }
}
