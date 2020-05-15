import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from "@angular/material";
import { AddressService } from "src/app/service/address.service";
import { Book } from "src/app/models/book";
import { environment } from "src/environments/environment";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-whishlist",
  templateUrl: "./whishlist.component.html",
  styleUrls: ["./whishlist.component.scss"],
})
export class WhishlistComponent implements OnInit {
  images = [{}, {}, {}, {}];
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private userService: UserService,
    private addressService: AddressService
  ) {}

  ngOnInit() {
    this.BookCount();
    this.onwhishlist();
  }

  bookcount: number;
  BookCount() {
    this.userService.getRequest(environment.whishList_book_count).subscribe(
      (Response: any) => {
        console.log(Response);
        this.bookcount = Response.obj;
        this.snackbar.open(Response.message, "undo", { duration: 2500 });
      },
      (error: any) => {
        console.error(error);
        console.log(error.error.message);
        this.snackbar.open(error.error.message, "undo", { duration: 2500 });
      }
    );
  }

  token: String;
  books: Array<Book> = [];
  book: Book = new Book();
  quantitylist: [];

  bookincart: number;
  myDatas = new Array();
  onwhishlist() {
    this.userService.getRequest(environment.whishlist_books).subscribe(
      (Response: any) => {
        console.log(Response);
        this.books = Response.obj;
        console.log(this.books);
        this.snackbar.open(Response.message, "undo", { duration: 2500 });
      },
      (error: any) => {
        console.error(error);
        console.log(error.error.message);
        this.snackbar.open(error.error.message, "undo", { duration: 2500 });
      }
    );
  }

  onRemove(book: any) {
    console.log(book);
    this.token = localStorage.getItem("token");
    this.userService
      .deleteRequest(
        environment.whishlist_books_remove + this.token + "/" + book.bookId,
        ""
      )
      .subscribe(
        (Response: any) => {
          console.log(Response);
          this.books = Response.obj;
          console.log(this.books);
          this.snackbar.open("WhishList", "undo", { duration: 2500 });
        },
        (error: any) => {
          console.error(error);
          console.log(error.error.message);
          this.snackbar.open(error.error.message, "undo", { duration: 2500 });
        }
      );
  }
}
