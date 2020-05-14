import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { Login } from "src/app/models/login";
import { Address } from "src/app/models/address";
import { MatSnackBar } from "@angular/material";
import { ViewcartService } from "src/app/service/viewcart.service";
import { Book } from "src/app/models/book";
import { AddressService } from "src/app/service/address.service";
import { Cartdetails } from "src/app/models/cartdetails";
import { DataService } from "src/app/service/data.service";
import { Subject, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpService } from "src/app/service/http.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-view-cart",
  templateUrl: "./view-cart.component.html",
  styleUrls: ["./view-cart.component.scss"],
})
export class ViewCartComponent implements OnInit {
  // images = [{}, {}, {}, {}];
  image: "assets/images/Image 11@2x.png";

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
    private addressService: AddressService
  ) {}

  ngOnInit() {
    // localStorage.setItem(
    //   "token",
    //   "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIn0.aG9tbKceX39kDuT9h9PWP9FTqOqGU6C3PYRi_dW_gH8Al9cGEX8EzAQ3h8KLxa7boufpdfZ23XUuAKc-zovsQg"
    // );
    this.getcountofbooks();
    this.getbooks();
  }

  // private subject = new Subject<any>();
  book: Book = new Book();
  //
  books: [];
  token: string;

  quantitylist: [];

  bookincart: number;
  myDatas = new Array();

  getcountofbooks() {
    this.token = localStorage.getItem("token");
    this.cartService
      .getRequest(environment.book_count_cart + this.token)
      .subscribe(
        (Response: any) => {
          console.log(Response);
          this.bookincart = Response.obj;
        },
        (error: any) => {
          console.error(error);
          console.log(error.error.message);
          this.snackbar.open(error.error.message, "undo", { duration: 2500 });
        }
      );
  }

  getbooks() {
    this.token = localStorage.getItem("token");
    this.cartService
      .getRequest(environment.Get_book_Cart + this.token)
      .subscribe(
        (Response: any) => {
          console.log(Response);
          this.books = Response.obj;

          //this.bookincart = Response.obj.length;
          console.log(this.books);
          for (var len in Response.obj) {
            this.books = Response.obj[len];
            let res = this.books["booksList"];
            let qt = this.books["quantityOfBooks"];
            console.log(this.books["cartId"]);
            console.log(this.myDatas);
            /**
             * bookdetails
             */
            for (var index in res) {
              this.book = res[0]; //book details
              this.quantitylist = this.books["quantityOfBooks"];
              this.book.quantitybto = this.books["quantityOfBooks"];
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

  // public get autoRefresh() {
  //   return this.subject;
  // }

  onQuantity(book: any) {
    console.log(book);
    for (var index in book.quantitybto) {
      // console.log(book.quantitybto[index]);
      this.cartService
        .putRequest(
          environment.cart_inc_bookquantity +
            this.token +
            "?bookId=" +
            book.bookId,
          book.quantitybto[index]
        )
        .subscribe(
          (Response: any) => {
            this.data.changeMessage("bookquantity");
            this.snackbar.open("updated...", "undo", { duration: 2500 });
          },
          (error: any) => {
            console.error(error);
            console.log(error.error.message);
            this.snackbar.open(error.error.message, "undo", { duration: 2500 });
          }
        );
    }
  }

  // onQuantity(book: any) {
  //   console.log(book);
  //   for (var index in book.quantitybto) {
  //     // console.log(book.quantitybto[index]);
  //     this.cartService.incrementQuantity(book, index).subscribe(
  //       (Response: any) => {
  //         // this.data.changeMessage("bookquantity");
  //         this.snackbar.open("updated...", "undo", { duration: 2500 });
  //       },
  //       (error: any) => {
  //         console.error(error);
  //         console.log(error.error.message);
  //         this.snackbar.open(error.error.message, "undo", { duration: 2500 });
  //       }
  //     );
  //   }

  // }

  ondescQuantity(book: any) {
    console.log(book);
    for (var index in book.quantitybto) {
      this.cartService
        .putRequest(
          environment.cart_desc_bookquantity +
            this.token +
            "?bookId=" +
            book.bookId,
          book.quantitybto[index]
        )
        .subscribe(
          (Response: any) => {
            this.data.changeMessage("bookquantity");
            this.snackbar.open("updated...", "undo", { duration: 2500 });
          },
          (error: any) => {
            console.error(error);
            console.log(error.error.message);
            this.snackbar.open(error.error.message, "undo", { duration: 2500 });
          }
        );
    }
  }

  onRemove(book: any) {
    console.log(book);
    //for (var index in book.quantitybto) {
    this.cartService
      .deleteRequest(
        environment.REMOVE_FROM_CART + this.token + "/" + book.bookId,
        ""
      )
      .subscribe(
        (Response: any) => {
          this.data.changeMessage("bookquantity");
          this.snackbar.open("updated...", "undo", { duration: 2500 });
        },
        (error: any) => {
          console.error(error);
          console.log(error.error.message);
          this.snackbar.open(error.error.message, "undo", { duration: 2500 });
        }
      );
    //}
  }

  open: boolean;
  fields: boolean;

  onOpen() {
    this.open = true;
    this.fields = true;
  }

  showSpinner = false;
  open2: boolean;
  addModel: Address = new Address();
  onOpen2() {
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.open2 = true;
    }, 2000);
    this.fields = false;

    this.addressService
      .postRequest("address/add/" + this.token, this.address)
      .subscribe((Response: any) => {});

    console.log(this.addModel.name + "***name");
    console.log(this.addModel.address + "**address");
    console.log(this.addModel.phoneNumber + "**phoneNumber");
    console.log(this.addModel.pincode + "**pincode");
    console.log(this.addModel.locality + "**locality");
    console.log(this.addModel.city + "**city");
    console.log(this.addModel);
  }

  onEdit() {
    this.fields = true;
    this.open2 = false;
  }

  onCheckOut() {
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(["/books/ordersucess"]);
    }, 2000);
  }
}
