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
  noOfBooks: number;
  visible: boolean;
  constructor(
    private _matSnackBar: MatSnackBar,
    private router: Router,
    private bookService: BookService
  ) {}
  ngOnInit() {
    this.noOfBooks = this.book.noOfBooks;
    this.isAddedToCart();
    this.isAddedToWishList();
    if (localStorage.getItem("token") != null) {
      this.visible = true;
    }
  }
  addToCart() {
    if (this.visible) {
      this.bookService
        .addToCart(this.book.bookId)
        .subscribe((response: any) => {
          console.log(response["obj"]);
          this.book.isAdded = true;
          this._matSnackBar.open("Book added to cart", "ok", {
            duration: 1000,
          });
        });
    } else {
      this._matSnackBar.open("please login", "ok", {
        duration: 1000,
      });
      this.router.navigateByUrl("/login");
    }
  }
  //adding book to wish list if user login
  addToWishlist() {
    if (this.visible) {
      this.bookService
        .addToWishList(this.book.bookId)
        .subscribe((response: any) => {
          console.log(response["obj"]);
          this.book.isListed = response["obj"];
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
  //getting boolean as a output and finding whether book is already in cart
  isAddedToCart() {
    this.bookService.isAddedTocart(this.book.bookId).subscribe(
      (response: any) => {
        this.book.isAdded = response["obj"];
      },
      (error: any) => {
        console.error(error);
        console.log(error.error.message);
      }
    );
  }
  isAddedToWishList() {
    this.bookService.isAddedToWishList(this.book.bookId).subscribe(
      (response: any) => {
        this.book.isListed = response["obj"];
      },
      (error: any) => {
        console.error(error);
        console.log(error.error.message);
      }
    );
  }
}
