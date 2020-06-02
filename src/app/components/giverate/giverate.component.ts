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
  @Input("color") private color: string;
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
  }
  onClick(rating: any) {
    console.log(rating);
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
  getBookById() {
    this.bookService.getBookById(this.bookId).subscribe((response: any) => {
      this.book = response["obj"];
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
}
