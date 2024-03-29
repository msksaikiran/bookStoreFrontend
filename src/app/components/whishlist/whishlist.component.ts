import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from "@angular/material";
import { AddressService } from "src/app/service/address.service";
import { Book } from "src/app/models/book";
import { environment } from "src/environments/environment";
import { UserService } from "src/app/service/user.service";
import { BookService } from "src/app/service/book.service";
import { DataService } from "src/app/service/data.service";

@Component({
  selector: "app-whishlist",
  templateUrl: "./whishlist.component.html",
  styleUrls: ["./whishlist.component.scss"],
})
export class WhishlistComponent implements OnInit {
  constructor(
    private snackbar: MatSnackBar,
    private data: DataService,
    private userService: UserService,
    private bookService: BookService,
    private _matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.BookCount();
    this.onwhishlist();
  }

  addToCart(book: any) {
    this.bookService.addToCart(book.bookId).subscribe((response: any) => {
      console.log(response["obj"]);
      this.onRemove(book);

      this.data.changeMessage("count");
      this._matSnackBar.open("Book added to cart", "ok", {
        duration: 1000,
      });
    });
  }

  bookcount: number;
  BookCount() {
    this.userService.getRequest(environment.whishList_book_count).subscribe(
      (Response: any) => {
        //console.log(Response);
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
        // console.log(Response);
        this.books = Response.obj;
        //console.log(this.books);
        this.snackbar.open(Response.message, "undo", { duration: 2500 });
      },
      (error: any) => {
        this.snackbar.open(error.error.message, "undo", { duration: 2500 });
      }
    );
  }

  count: boolean = true;
  onRemove(book: any) {
    // console.log(book);
    this.token = localStorage.getItem("token");
    this.userService
      .deleteRequest(
        environment.whishlist_books_remove + this.token + "/" + book.bookId,
        ""
      )
      .subscribe(
        (Response: any) => {
          //console.log(Response);
          this.books = Response.obj;
          //console.log(this.books);
          this.bookcount -= 1;
          this.count = false;
          this.snackbar.open(Response.message, "undo", { duration: 2500 });
        },
        (error: any) => {
          this.snackbar.open(error.error.message, "undo", { duration: 2500 });
        }
      );
  }
}
