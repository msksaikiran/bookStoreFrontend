import { Component, OnInit, Output } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { Login } from "src/app/models/login";
import { Address } from "src/app/models/address";
import {
  MatSnackBar,
  MatRadioChange,
  MatSelectChange,
} from "@angular/material";
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
import { BookService } from "src/app/service/book.service";

@Component({
  selector: "app-view-cart",
  templateUrl: "./view-cart.component.html",
  styleUrls: ["./view-cart.component.scss"],
})
export class ViewCartComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private bookService: BookService,
    private cartService: ViewcartService,
    private http_service: HttpService,
    private data: DataService,
    public location: Location,
    private formBuilder: FormBuilder,
    private addressService: AddressService
  ) {}

  customerForm: FormGroup;
  ngOnInit() {
    this.data.currentMessage.subscribe((message) => {
      if ((message = "remove")) {
        this.bookNquantityData.splice(0);
        this.getbooks();
      }
    });

    this.customerForm = this.formBuilder.group({
      name: ["", Validators.required],
      contact: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      pinCode: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      address: ["", [Validators.required]],
      city: ["", [Validators.required]],
      country: [""],
      landMark: ["", [Validators.required]],
    });

    this.getcountofbooks();
    //this.getbooks();
  }

  book: Book = new Book();
  bookArray: [];
  bookNquantityData: Array<Book> = [];
  quantitylist: [];
  bookcount: number;

  placeOrder: boolean = true;
  getcountofbooks() {
    this.cartService.getRequest(environment.book_count_cart).subscribe(
      (Response: any) => {
        this.bookcount = Response.obj;

        if (this.bookcount == 0) {
          this.placeOrder = false;
        }
      },
      (error: any) => {
        this.snackbar.open(error.error.message, "undo", { duration: 1000 });
      }
    );
  }

  getbooks() {
    this.cartService.getRequest(environment.Get_book_Cart).subscribe(
      (Response: any) => {
        this.bookArray = Response.obj;
        /**
         * cart Details
         */
        for (var len in Response.obj) {
          this.bookArray = Response.obj[len];
          /**
           * bookdetails
           */
          if (this.bookArray["booksList"][0] != null) {
            this.book = this.bookArray["booksList"][0]; //adding book details to bookmodel
            this.book.quantitybto = this.bookArray["quantityOfBooks"];
            this.bookNquantityData.push(this.book);
          }
        }
        // console.log(this.bookNquantityData);
        this.snackbar.open(Response.message, "undo", { duration: 1500 });
      },
      (error: any) => {
        this.snackbar.open(error.error.message, "undo", { duration: 1000 });
      }
    );
  }

  onQuantity(book: any) {
    /**
     * if bookcount is equal to noOfBooks available
     */
    if (book.quantitybto[0]["quantityOfBook"] == book.noOfBooks) {
      this.snackbar.open(
        "Only " +
          book.quantitybto[0]["quantityOfBook"] +
          " books are avaliable",
        "undo",
        { duration: 2500 }
      );
    } else {
      book.quantitybto[0]["quantityOfBook"] + 1;
      book.totalPrice =
        book.quantitybto[0]["quantityOfBook"] * book["bookPrice"];
      this.cartService
        .putRequest(
          environment.cart_inc_bookquantity + "?bookId=" + book.bookId,
          book.quantitybto[0]
        )
        .subscribe(
          (Response: any) => {
            if (Response.obj["quantityOfBooks"] != null) {
              book.quantitybto = Response.obj["quantityOfBooks"];
            }
          },
          (error: any) => {
            this.snackbar.open(error.error.message, "undo", { duration: 1000 });
          }
        );
    }
  }

  ondescQuantity(book: any) {
    if (book.quantitybto[0]["quantityOfBook"] == 1) {
      this.snackbar.open("Atleast 1 Book in the cart", "undo", {
        duration: 2500,
      });
    } else {
      book.quantitybto[0]["quantityOfBook"] + 1;
      book.totalPrice =
        book.quantitybto[0]["quantityOfBook"] * book["bookPrice"];
      this.cartService
        .putRequest(
          environment.cart_desc_bookquantity + "?bookId=" + book.bookId,
          book.quantitybto[0]
        )
        .subscribe(
          (Response: any) => {
            if (Response.obj["quantityOfBooks"] != null) {
              book.quantitybto = Response.obj["quantityOfBooks"];
            }
          },
          (error: any) => {
            this.snackbar.open("cannot descrease", "undo", { duration: 1000 });
          }
        );
    }
  }

  count: boolean = true;
  addressclose: boolean = true;
  rmopen: boolean = true;
  onRemove(book: any) {
    this.cartService
      .deleteRequest(
        environment.REMOVE_FROM_CART +
          localStorage.getItem("token") +
          "/" +
          book.bookId,
        ""
      )
      .subscribe(
        (Response: any) => {
          if (Response.obj) {
            this.data.changeMessage("remove");
            // for (var index in this.bookNquantityData) {
            //   if (this.bookNquantityData[index] == book) {
            //     this.bookNquantityData[index] = null;
            //   }
            // }
            this.bookcount -= 1;
            this.count = false;
          }

          this.placeOrder = true;
          this.open = false;
          this.open2 = false;

          if (this.bookcount == 0) {
            this.placeOrder = false;
          }
        },
        (error: any) => {
          this.spinner.hide();
          this.snackbar.open(error.error.message, "undo", { duration: 1000 });
        }
      );
  }

  open: boolean;
  fields: boolean;
  person: String = "Home";

  onChange(mrChange: MatRadioChange) {
    this.open2 = false;
    console.log(mrChange.value);
    this.person = mrChange.value;
  }

  shippingCharge: number;
  selected(event: MatSelectChange) {
    if (event.value == "india") {
      this.shippingCharge = 50;
    } else {
      this.shippingCharge = 100;
    }
  }

  onplaceOrder() {
    this.open = true;
    this.fields = true;

    this.getaddress();
  }

  showSpinner = false;
  open2: boolean;
  addModel: Address = new Address();
  OrderDetails: Array<Book> = [];
  grandTotal: number;
  onContinue() {
    this.grandTotal = 0;
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();

      this.addModel.type = this.person;
      //this.addModel.type == this.favoriteSeason;
      this.addressService
        .postRequest(
          "address/add/" + localStorage.getItem("token"),
          this.addModel
        )
        .subscribe(
          (Response: any) => {
            this.fields = false;
            this.open2 = true;
            this.customerForm.disable();
            this.snackbar.open(Response.message, "undo", {
              duration: 3000,
            });
          },
          (error: any) => {
            this.spinner.hide();
            this.snackbar.open(error.error.message, "undo", { duration: 1000 });
          }
        );
    }, 2000); //spinner

    for (var index in this.bookNquantityData) {
      if (this.bookNquantityData[index] != null) {
        this.grandTotal += this.bookNquantityData[index]["quantitybto"][0][
          "totalprice"
        ];
      }
    }
    this.grandTotal += this.shippingCharge;
  }

  onEdit() {
    this.fields = true;
    this.open2 = false;
    this.customerForm.enable();
  }

  orderId: any;
  onCheckOut(book: any) {
    //console.log(book);
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
            this.data.changeMessage("checkout");
            this.orderId = Response.obj.orderId;
            this.router.navigate(["/books/ordersucess/" + this.orderId]);
            this.snackbar.open(Response.message, "undo", { duration: 2500 });
          }, 2000);
        },
        (error: any) => {
          this.spinner.hide();
          this.snackbar.open(error.error.message, "undo", { duration: 2500 });
        }
      );
  }

  getaddress() {
    this.addressService
      .getRequest("address/getAddresstype/home")
      .subscribe((Response: any) => {
        //console.log(Response);
        if (Response.obj != null) {
          this.addModel.address = Response.obj["address"];
          this.addModel.city = Response.obj["city"];
          this.addModel.landmark = Response.obj["landmark"];
          this.addModel.locality = Response.obj["locality"];
          this.addModel.name = Response.obj["name"];
          this.addModel.phoneNumber = Response.obj["phoneNumber"];
          this.addModel.pincode = Response.obj["pincode"];
          this.addModel.type = Response.obj["type"];
        }
      });
  }

  onwork() {
    this.addressService
      .getRequest(environment.cart_work_address)
      .subscribe((Response: any) => {
        //console.log(Response);
        if (Response.obj != null) {
          this.addModel.address = Response.obj["address"];
          this.addModel.city = Response.obj["city"];
          this.addModel.landmark = Response.obj["landmark"];
          this.addModel.locality = Response.obj["locality"];
          this.addModel.name = Response.obj["name"];
          this.addModel.phoneNumber = Response.obj["phoneNumber"];
          this.addModel.pincode = Response.obj["pincode"];
          this.addModel.type = Response.obj["type"];
        }
      });
  }

  onOther() {
    this.addressService
      .getRequest(environment.cart_other_address)
      .subscribe((Response: any) => {
        //console.log(Response);
        if (Response.obj != null) {
          //console.log(Response.obj["type"]);
          this.addModel.address = Response.obj["address"];
          this.addModel.city = Response.obj["city"];
          this.addModel.landmark = Response.obj["landmark"];
          this.addModel.locality = Response.obj["locality"];
          this.addModel.name = Response.obj["name"];
          this.addModel.phoneNumber = Response.obj["phoneNumber"];
          this.addModel.pincode = Response.obj["pincode"];
          this.addModel.type = Response.obj["type"];
        }
      });
  }
}
