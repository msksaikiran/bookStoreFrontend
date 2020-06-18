import { Component, OnInit, Input } from "@angular/core";

import { MatSnackBar, MatDialog } from "@angular/material";
import { Book } from "src/app/models/book";
import { Router } from "@angular/router";
import { BookService } from "src/app/service/book.service";
import { environment } from "src/environments/environment";
import { ViewcartService } from "src/app/service/viewcart.service";
import { BehaviorSubject } from "rxjs";
import { LoginComponent } from "../login/login.component";
import { DataService } from "src/app/service/data.service";
import { Rating } from "src/app/models/rating";
import { HttpParams } from "@angular/common/http";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"],
})
export class BooksComponent implements OnInit {
  @Input() book: Book;
  noOfBooks: number;
  visible: boolean;
  getCount: boolean = false;
  totalRate: number = 0;
  message: String;
  ratingArr: Array<any>;
  ratenumber: number;
  constructor(
    private _matSnackBar: MatSnackBar,
    private data: DataService,
    private router: Router,
    private bookService: BookService,
    public dialog: MatDialog,
    private cartService: ViewcartService
  ) {}
  ngOnInit() {
    this.data.currentMessage.subscribe((message) => (this.message = message));
    this.noOfBooks = this.book.noOfBooks;
    this.getTotalRating();
    if (localStorage.getItem("token") != null) {
      this.visible = true;
      this.isAddedToCart();
      this.isAddedToWishList();
    }
  }

  addToCart() {
    if (this.visible) {
      this.bookService
        .addToCart(this.book.bookId)
        .subscribe((response: any) => {
          this.data.changeMessage("count");
          this.book.isAdded = response.obj;
          // this.getCount = response.obj;
          this._matSnackBar.open("Book added to cart", "ok", {
            duration: 1000,
          });
        });
    } else {
      const dialogRef = this.dialog.open(LoginComponent);
      dialogRef.afterClosed().subscribe((result) => {
        window.location.reload();
      });
      this._matSnackBar.open("please login", "ok", {
        duration: 1000,
      });
    }
  }
  //adding book to wish list if user login
  addToWishlist() {
    if (this.visible) {
      this.bookService
        .addToWishList(this.book.bookId)
        .subscribe((response: any) => {
          this.book.isListed = response["obj"];
          this._matSnackBar.open("Book added to wishlist", "ok", {
            duration: 1000,
          });
        });
    } else {
      const dialogRef = this.dialog.open(LoginComponent);
      dialogRef.afterClosed().subscribe((result) => {
        window.location.reload();
      });
      this._matSnackBar.open("please login", "ok", {
        duration: 1000,
      });
    }
  }
  //getting boolean as a output and finding whether book is already in cart
  isAddedToCart() {
    this.bookService
      .isAddedTocart(this.book.bookId)
      .subscribe((response: any) => {
        this.book.isAdded = response["obj"];
      });
  }
  isAddedToWishList() {
    this.bookService
      .isAddedToWishList(this.book.bookId)
      .subscribe((response: any) => {
        this.book.isListed = response["obj"];
      });
  }
  @Input("rating") private rating: number = 4;
  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return "star";
    } else {
      return "star_border";
    }
  }
  ratingAndReviews(book: any) {
    this.router.navigate(["books/details/" + book.bookId]);
  }
  rate: Rating;
  color: any;
  total: any;
  getTotalRating() {
    this.bookService
      .getratingandreview(this.book.bookId)
      .subscribe((response: any) => {
        this.ratingArr = response.obj;
        for (var index in this.ratingArr) {
          this.rate = this.ratingArr[index];
          this.totalRate += this.rate.rating;
          this.total = this.totalRate;
          this.ratenumber += 1;
        }
        if (this.ratenumber > 1) {
          this.totalRate = this.totalRate / this.ratenumber;
          this.total = Number.parseFloat(this.totalRate + "").toFixed(1);
        }
        if (this.totalRate >= 3 || this.totalRate >= 2) {
          this.color = "rgb(245, 182, 110)";
        }
        if (this.totalRate >= 4) {
          this.color = "rgb(16, 136, 16)";
        }
        if (this.totalRate < 2) {
          this.color = "rgb(250, 0, 0)";
        }
      });
  }
}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn",
}
