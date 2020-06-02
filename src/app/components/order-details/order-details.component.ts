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

  //bookincart: number;
  myDatas = new Array();
  bookcount: number;

  orderId = new Array();
  count = 0;
  onOrderlist() {
    this.userService
      .getRequest(environment.orderlist_books + localStorage.getItem("token"))
      .subscribe(
        (Response: any) => {
          //console.log(Response);
          for (var len in Response.obj) {
            this.count += 1;
            this.books = Response.obj[len];

            let res = this.books["booksList"];
            this.myDatas.push(this.books["booksList"]);
            /**
             * bookdetails
             */
            for (var index in res) {
              this.book = res[index]; //book details
              this.book.orderId = this.books["orderId"];
              this.book.totalPrice = this.books["totalPrice"];
              this.myDatas.push(this.book);
            }
          }
          //console.log(this.myDatas);
        },
        (error: any) => {
          this.snackbar.open(error.error.message, "undo", { duration: 2500 });
        }
      );
  }
}
