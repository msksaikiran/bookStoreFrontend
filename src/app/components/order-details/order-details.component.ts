import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from "@angular/material";
import { AddressService } from "src/app/service/address.service";
import { Book } from "src/app/models/book";

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
    // private cartService: ViewcartService,
    private addressService: AddressService
  ) {}

  ngOnInit() {
    this.onOrderlist();
  }

  token: String;
  books: [];
  book: Book = new Book();
  //
  // books: [];
  // token: string;

  quantitylist: [];

  bookincart: number;
  myDatas = new Array();
  onOrderlist() {
    this.token = localStorage.getItem("token");
    this.addressService.getRequest("orders/orderBooks/" + this.token).subscribe(
      (Response: any) => {
        //this.bookincart = Response.obj.length;
        console.log(this.books);
        for (var len in Response.obj) {
          this.books = Response.obj[len];
          let res = this.books["booksList"];
          // let qt = this.books["quantityOfBooks"];
          // console.log(this.books["cartId"]);
          // console.log(this.myDatas);
          /**
           * bookdetails
           */
          for (var index in res) {
            this.book = res[0]; //book details
            //this.quantitylist = this.books["quantityOfBooks"];
            // this.book.quantitybto = this.books["quantityOfBooks"];
            this.myDatas.push(this.book);
          }
        }
        console.log(this.myDatas);
        this.snackbar.open(Response.message, "undo", { duration: 2500 });
      },
      (error: any) => {
        console.error(error);
        console.log(error.error.message);
        this.snackbar.open(error.error.message, "undo", { duration: 2500 });
      }
    );
  }
}
