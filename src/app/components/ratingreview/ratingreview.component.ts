import { Component, OnInit, Input } from "@angular/core";
import { Book } from "src/app/models/book";
import { BookService } from "src/app/service/book.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar, MatDialog } from "@angular/material";
import { LoginComponent } from "../login/login.component";
import { Rating } from "src/app/models/rating";
import { DataService } from "src/app/service/data.service";

@Component({
  selector: "app-ratingreview",
  templateUrl: "./ratingreview.component.html",
  styleUrls: ["./ratingreview.component.scss"],
})
export class RatingreviewComponent implements OnInit {
  bookId: any;
  ratings: Array<any> = [];
  rate: any;
  visible: boolean;
  isAdded: boolean;
  isListed: boolean;
  book: Book;
  bookImage: any;
  bookName: any;
  bookAuthor: any;
  bookPrice: any;
  bookDescription: any;
  sellerName: any;
  show: boolean;
  constructor(
    private bookService: BookService,
    private router: Router,
    private data: DataService,
    private _matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get("bookId");
    this.getBookById();
    this.getRatings();
    if (localStorage.getItem("token") != null) {
      this.visible = true;
      this.isAddedToCart();
      this.isAddedToWishList();
    }
  }
  getBookById() {
    this.bookService.getBookById(this.bookId).subscribe((response: any) => {
      if (response.obj != null) {
        this.book = response["obj"];
        this.book.isListed = false;
        this.book.isAdded = false;
        this.bookImage = response.obj["bookImage"];
        this.bookName = response.obj["bookName"];
        this.bookPrice = response.obj["bookPrice"];
        this.bookAuthor = response.obj["bookAuthor"];
        this.bookDescription = response.obj["bookDescription"];
        this.sellerName = response.obj["sellerName"];
        this.show = true;
      }
    });
  }
  addToCart() {
    if (this.visible) {
      this.bookService.addToCart(this.bookId).subscribe((response: any) => {
        this.data.changeMessage("count");
        console.log(response["obj"]);
        this.isAdded = response.obj;
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
      this.bookService.addToWishList(this.bookId).subscribe((response: any) => {
        console.log(response["obj"]);
        this.isListed = response["obj"];
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
  //getting boolean as a output and finding whether book is already
  isAddedToCart() {
    this.bookService.isAddedTocart(this.bookId).subscribe((response: any) => {
      this.isAdded = response["obj"];
    });
  }
  isAddedToWishList() {
    this.bookService
      .isAddedToWishList(this.bookId)
      .subscribe((response: any) => {
        this.isListed = response["obj"];
      });
  }
  rateNow() {
    if (this.visible) {
      localStorage.setItem("totalRate", this.totalRate + "");
      this.router.navigate(["books/ratingandreview/" + this.bookId]);
    }
  }
  totalRate: number = 0;
  ratenumber: number;
  color: any;
  getRatings() {
    this.bookService
      .getratingandreview(this.bookId)
      .subscribe((response: any) => {
        this.ratings = response.obj;
        for (var index in this.ratings) {
          this.rate = this.ratings[index];
          this.totalRate += this.rate.rating;
          this.ratenumber += 1;
        }
        if (this.ratenumber > 1) {
          this.totalRate = this.totalRate / this.ratenumber;
        }
        if (this.totalRate >= 3 || this.totalRate >= 2) {
          this.color = "rgb(245, 182, 110)";
        }
        if (this.totalRate >= 4) {
          this.color = "rgb(16, 136, 16)";
        }
        if (this.totalRate < 2) {
          this.color = "rgb(216, 69, 59)";
        }
      });
  }
}
