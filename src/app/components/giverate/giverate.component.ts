import { Component, OnInit, Input, Output } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Book } from "src/app/models/book";
import { BookService } from "src/app/service/book.service";
import { ok } from "assert";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-giverate",
  templateUrl: "./giverate.component.html",
  styleUrls: ["./giverate.component.scss"],
})
export class GiverateComponent implements OnInit {
  @Input("starCount") private starCount: number = 5;
  color: string;
  private snackBarDuration: number = 2000;
  private ratingArr = [];
  rating: number;
  book: Book;
  bookId: any;
  review: any;
  totalRate: any;
  constructor(
    private snackBar: MatSnackBar,
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get("bookId");
    this.getBookById();
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    this.totalRate = localStorage.getItem("totalRate");
    this.getColor();
  }
  onClick(rating: any) {
    this.snackBar.open("You rated " + rating + " / " + this.starCount, "", {
      duration: this.snackBarDuration,
    });
    this.rating = rating;
    return false;
  }
  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return "star";
    } else {
      return "star_border";
    }
  }
  bookImage: any;
  bookName: any;
  bookAuthor: any;
  getBookById() {
    this.bookService.getBookById(this.bookId).subscribe((response: any) => {
      if (response["obj"] != null) {
        this.book = response.obj;
        this.bookImage = response.obj["bookImage"];
        this.bookAuthor = response.obj["bookAuthor"];
        this.bookName = response.obj["bookName"];
      }
    });
  }
  submitRate() {
    const data = {
      rating: this.rating,
      review: this.review,
    };
    console.log("rating is", data.rating);
    console.log("review is ", data.review);
    this.bookService
      .ratingandreview(this.bookId, data)
      .subscribe((response: any) => {
        this.snackBar.open("Thank you..", "ok", { duration: 1000 });
      });
  }
  getColor() {
    if (this.totalRate >= 3 || this.totalRate >= 2) {
      this.color = "rgb(245,182,110)";
    }
    if (this.totalRate >= 4) {
      this.color = "rgb(16,136,16)";
    }
    if (this.totalRate < 2) {
      this.color = "rgb(250,0,0)";
    }
  }
}
