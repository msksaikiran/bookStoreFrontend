import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from "@angular/material";
import { AddressService } from "src/app/service/address.service";
import { Book } from "src/app/models/book";
import { environment } from "src/environments/environment";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"],
})
export class OrderDetailsComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private userService: UserService,
    private addressService: AddressService
  ) {}

  ngOnInit() {
    this.onOrderlist();
  }

  token: String;
  books: Array<Book> = [];
  book: Book = new Book();

  quantitylist: [];

  bookincart: number;
  myDatas = new Array();
  bookcount: number;

  BookCount() {
    this.userService
      .getRequest(
        environment.orderlist_books_Count + localStorage.getItem("token")
      )
      .subscribe(
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

  orderId = new Array();
  count = 0;
  onOrderlist() {
    this.token = localStorage.getItem("token");

    this.userService
      .getRequest(environment.orderlist_books + this.token)
      .subscribe(
        (Response: any) => {
          console.log(Response);
          for (var len in Response.obj) {
            this.books = Response.obj[len];
            this.orderId.push(Response.obj[0]["orderId"]);
            let res = this.books["booksList"];
            console.log(this.books["booksList"]);
            this.myDatas.push(this.books["booksList"]);
            /**
             * bookdetails
             */
            for (var index in res) {
              this.book = res[index]; //book details
              this.book.orderId = this.books["orderId"];
              this.myDatas.push(this.book);
              console.log(this.count++);
            }
          }
          console.log(this.myDatas);
        },
        (error: any) => {
          console.error(error);
          console.log(error.error.message);
          this.snackbar.open(error.error.message, "undo", { duration: 2500 });
        }
      );
  }
}
