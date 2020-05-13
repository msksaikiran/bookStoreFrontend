import { Component, OnInit, Input } from "@angular/core";

import { MatSnackBar } from "@angular/material";
import { Book } from "src/app/models/book";
import { Router } from "@angular/router";
import { BookService } from "src/app/service/book.service";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"],
})
export class BooksComponent implements OnInit {
  @Input() book: Book;
  isAdded: boolean = false;
  isOutOfStock: boolean = false;
  noOfBooks: number;
  isListed: boolean = false;
  constructor(
    private _matSnackBar: MatSnackBar,
    private router: Router,
    private bookService: BookService
  ) {}
  ngOnInit() {
    this.noOfBooks = this.book.noOfBooks;
  }
  addToCart() {
    let token = localStorage.getItem("token");
    if (!(token == "")) {
      this.bookService
        .addToCart(this.book.bookId)
        .subscribe((response: any) => {
          console.log(response["obj"]);
          this.isAdded = true;
          this._matSnackBar.open("Book added to cart", "ok", {
            duration: 1000,
          });
        });
    } else {
      this._matSnackBar.open("please login", "ok", {
        duration: 2000,
      });
      this.router.navigateByUrl("/login");
    }
  }
  removeFromCart() {
    this.isAdded = false;
    let token = localStorage.getItem("token");
    if (!(token == "")) {
      this.bookService
        .removeFromCart(this.book.bookId)
        .subscribe((response: any) => {
          console.log(response["obj"]);
          this._matSnackBar.open("Book removed from cart", "ok", {
            duration: 1000,
          });
        });
    } else {
      this._matSnackBar.open("please login", "ok", {
        duration: 2000,
      });
      this.router.navigateByUrl("/login");
    }
  }
  addToWishlist() {
    let token = localStorage.getItem("token");
    if (!(token == "")) {
      this.isListed = true;
      this.bookService
        .addToWishList(this.book.bookId)
        .subscribe((response: any) => {
          console.log(response["obj"]);
          this._matSnackBar.open("Book added to wishlist", "ok", {
            duration: 1000,
          });
        });
    } else {
      this._matSnackBar.open("please login", "ok", {
        duration: 2000,
      });
      this.router.navigateByUrl("/login");
    }
  }
  removeFromWishlist() {
    this.isListed = false;
    let token = localStorage.getItem("token");
    if (!(token == "")) {
      this.bookService
        .removeFromWishList(this.book.bookId)
        .subscribe((response: any) => {
          console.log(response["obj"]);
          this._matSnackBar.open("Book removed from wishlist", "ok", {
            duration: 1000,
          });
        });
    } else {
      this._matSnackBar.open("please login", "ok", {
        duration: 2000,
      });
      this.router.navigateByUrl("/login");
    }
  }
}
