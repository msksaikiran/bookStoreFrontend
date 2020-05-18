import { Component, OnInit, Output } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { Login } from "src/app/models/login";
import { Address } from "src/app/models/address";
import { MatSnackBar, MatRadioChange } from "@angular/material";
import { ViewcartService } from "src/app/service/viewcart.service";
import { Book } from "src/app/models/book";
import { AddressService } from "src/app/service/address.service";
import { Cartdetails } from "src/app/models/cartdetails";
import { DataService } from "src/app/service/data.service";
import { Subject, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpService } from "src/app/service/http.service";
import { environment } from "src/environments/environment";
import { Location } from "@angular/common";
import { EventEmitter } from "events";

@Component({
  selector: "app-view-cart",
  templateUrl: "./view-cart.component.html",
  styleUrls: ["./view-cart.component.scss"],
})
export class ViewCartComponent implements OnInit {
  name = new FormControl([
    Validators.required,
    Validators.minLength(4),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  mobile = new FormControl([
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]);
  pincode = new FormControl([
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(6),
  ]);

  locality = new FormControl([
    Validators.required,
    Validators.minLength(10),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  address = new FormControl([
    Validators.required,
    Validators.minLength(8),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  city = new FormControl([
    Validators.required,
    Validators.minLength(10),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  landmark = new FormControl([
    Validators.required,
    Validators.minLength(10),
    Validators.pattern("[a-zA-Z ]*"),
  ]);

  nameValidation() {
    return this.name.hasError("required") ? "" : "";
  }
  phoneNumber() {
    return this.mobile.hasError("required") ? "" : "";
  }
  pincodeValidation() {
    return this.name.hasError("required") ? "" : "";
  }
  localityValidation() {
    return this.locality.hasError("required") ? "" : "";
  }
  addressValidation() {
    return this.address.hasError("required") ? "" : "";
  }
  cityValidation() {
    return this.city.hasError("required") ? "" : "";
  }
  landmarkValidation() {
    return this.landmark.hasError("required") ? "" : "";
  }

  // password = new FormControl(this.login.password, [
  //   Validators.required,
  //   Validators.minLength(7)
  // ]);
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private cartService: ViewcartService,
    private http_service: HttpService,
    private data: DataService,
    public location: Location,
    private addressService: AddressService
  ) {}

  ngOnInit() {
    this.getcountofbooks();
    this.getbooks();
  }

  book: Book = new Book();
  books: [];
  token: string;
  bookNquantityData: Array<Book> = [];
  quantitylist: [];
  bookcount: number;

  placeOrder: boolean = true;
  getcountofbooks() {
    this.token = localStorage.getItem("token");
    this.cartService.getRequest(environment.book_count_cart).subscribe(
      (Response: any) => {
        this.bookcount = Response.obj;
        //this.book.bookcountincart = Response.obj;
        if (this.bookcount == 0) {
          this.placeOrder = false;
        }
      },
      (error: any) => {
        this.snackbar.open(error.error.message, "undo", { duration: 2500 });
      }
    );
  }

  //totalPrice;
  getbooks() {
    this.token = localStorage.getItem("token");
    this.cartService.getRequest(environment.Get_book_Cart).subscribe(
      (Response: any) => {
        //console.log(Response);
        this.books = Response.obj;
        /**
         * cart Details
         */
        console.log(this.books);
        for (var len in Response.obj) {
          this.books = Response.obj[len];

          let bookDetails = this.books["booksList"];
          let qt = this.books["quantityOfBooks"];
          /**
           * bookdetails
           */
          for (var index in bookDetails) {
            this.book = bookDetails[0]; //adding book details to bookmodel

            this.quantitylist = this.books["quantityOfBooks"];
            this.book.quantitybto = this.books["quantityOfBooks"];
            this.book.totalPrice =
              this.book.quantitybto[0]["quantityOfBook"] *
              this.book["bookPrice"];

            this.bookNquantityData.push(this.book);
          }
        }
        console.log(this.bookNquantityData);
        this.snackbar.open(Response.message, "undo", { duration: 2500 });
      },
      (error: any) => {
        this.snackbar.open(error.error.message, "undo", { duration: 2500 });
      }
    );
  }

  quantitydetails: Cartdetails = new Cartdetails();
  onQuantity(book: any) {
    console.log(book);

    this.cartService
      .putRequest(
        environment.cart_inc_bookquantity + "?bookId=" + book.bookId,
        book.quantitybto[0]
      )
      .subscribe(
        (Response: any) => {
          book.quantitybto = Response.obj["quantityOfBooks"];
          this.book.totalPrice =
            this.book.quantitybto[0]["quantityOfBook"] * this.book["bookPrice"];
        },
        (error: any) => {
          this.snackbar.open(error.error.message, "undo", { duration: 2500 });
        }
      );
  }

  ondescQuantity(book: any) {
    console.log(book);

    this.cartService
      .putRequest(
        environment.cart_desc_bookquantity + "?bookId=" + book.bookId,
        book.quantitybto[0]
      )
      .subscribe(
        (Response: any) => {
          book.quantitybto = Response.obj["quantityOfBooks"];
          this.book.totalPrice =
            this.book.quantitybto[0]["quantityOfBook"] * this.book["bookPrice"];
        },
        (error: any) => {
          this.snackbar.open("cannot descrease", "undo", { duration: 2500 });
        }
      );
  }

  count: boolean = true;
  onRemove(book: any) {
    console.log(book);
    this.token = localStorage.getItem("token");
    this.cartService
      .deleteRequest(
        environment.REMOVE_FROM_CART + this.token + "/" + book.bookId,
        ""
      )
      .subscribe(
        (Response: any) => {
          if (Response.obj) {
            for (var index in this.bookNquantityData) {
              if (this.bookNquantityData[index] == book) {
                this.bookNquantityData[index] = null;
              }
            }
            this.bookcount -= 1;
            this.count = false;
            if (this.bookcount == 0) {
              this.placeOrder = false;
            }
          }
        },
        (error: any) => {
          this.snackbar.open(error.error.message, "undo", { duration: 2500 });
        }
      );
  }

  open: boolean;
  fields: boolean;
  person: String;

  onChange(mrChange: MatRadioChange) {
    this.open2 = false;
    console.log(mrChange.value);
    this.person = mrChange.value;
  }

  onplaceOrder() {
    this.open = true;
    this.fields = true;
    this.getaddress();
  }

  showSpinner = false;
  open2: boolean;
  addModel: Address = new Address();
  onContinue() {
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();

      this.addModel.type = this.person;

      this.addressService
        .postRequest("address/add/" + this.token, this.addModel)
        .subscribe(
          (Response: any) => {
            this.fields = false;
            this.open2 = true;
            this.snackbar.open(Response.message, "undo", {
              duration: 3000,
            });
          },
          (error: any) => {
            console.error(error);
            console.log(error.error.message);
            this.snackbar.open(error.error.message, "undo", { duration: 2500 });
          }
        );
    }, 2000); //spinner
  }

  onEdit() {
    this.fields = true;
    this.open2 = false;
  }

  onCheckOut(book: any) {
    console.log(book);
    this.spinner.show();
    this.showSpinner = true;

    this.cartService
      .postRequest(
        environment.orderlist_books_confrim + localStorage.getItem("token"),
        ""
      )
      .subscribe(
        (Response: any) => {
          setTimeout(() => {
            this.spinner.hide();
            this.router.navigate(["/books/ordersucess"]);
            this.snackbar.open(Response.message, "undo", { duration: 2500 });
          }, 2000);
        },
        (error: any) => {
          console.error(error);
          console.log(error.error.message);
          this.snackbar.open(error.error.message, "undo", { duration: 2500 });
        }
      );
  }

  getaddress() {
    this.addressService.getRequest("address/getAddresstype/home").subscribe(
      (Response: any) => {
        console.log(Response);
        if (Response.status) {
          this.addModel.address = Response.obj["address"];
          this.addModel.city = Response.obj["city"];
          this.addModel.landmark = Response.obj["landmark"];
          this.addModel.locality = Response.obj["locality"];
          this.addModel.name = Response.obj["name"];
          this.addModel.phoneNumber = Response.obj["phoneNumber"];
          this.addModel.pincode = Response.obj["pincode"];
          this.addModel.type = Response.obj["type"];
        }
      },
      (error: any) => {
        console.log(error.error.message);
        this.snackbar.open(error.error.message, "undo", { duration: 2500 });
      }
    );
  }

  onwork() {
    this.addressService.getRequest("address/getAddresstype/work").subscribe(
      (Response: any) => {
        console.log(Response);
        if (Response.status) {
          this.addModel.address = Response.obj["address"];
          this.addModel.city = Response.obj["city"];
          this.addModel.landmark = Response.obj["landmark"];
          this.addModel.locality = Response.obj["locality"];
          this.addModel.name = Response.obj["name"];
          this.addModel.phoneNumber = Response.obj["phoneNumber"];
          this.addModel.pincode = Response.obj["pincode"];
          this.addModel.type = Response.obj["type"];
        }
      },
      (error: any) => {
        console.log(error.error.message);
        this.snackbar.open(error.error.message, "undo", { duration: 2500 });
      }
    );
  }

  onOther() {
    this.addressService.getRequest("address/getAddresstype/other").subscribe(
      (Response: any) => {
        console.log(Response);
        if (Response.status) {
          console.log(Response.obj["type"]);
          this.addModel.address = Response.obj["address"];
          this.addModel.city = Response.obj["city"];
          this.addModel.landmark = Response.obj["landmark"];
          this.addModel.locality = Response.obj["locality"];
          this.addModel.name = Response.obj["name"];
          this.addModel.phoneNumber = Response.obj["phoneNumber"];
          this.addModel.pincode = Response.obj["pincode"];
          this.addModel.type = Response.obj["type"];
        }
      },
      (error: any) => {
        console.log(error.error.message);
        this.snackbar.open(error.error.message, "undo", { duration: 2500 });
      }
    );
  }
}
