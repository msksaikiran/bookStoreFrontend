import { Component, OnInit, Input, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Addbook } from "src/app/models/addbook";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpService } from "src/app/service/http.service";
import { BookService } from "src/app/service/book.service";

import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-addbook",
  templateUrl: "./addbook.component.html",
  styleUrls: ["./addbook.component.scss"],
})
export class AddbookComponent implements OnInit {
  private selectedFile;
  imgURL: any;
  token: any;
  addbooks: Addbook = new Addbook();
  bookName = new FormControl(this.addbooks.bookName, [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  bookAuthor = new FormControl(this.addbooks.bookAuthor, [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  bookPrice = new FormControl(this.addbooks.bookPrice, [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("[0-9 ]*"),
  ]);
  noOfBooks = new FormControl(this.addbooks.noOfBooks, [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("[0-9]*"),
  ]);
  bookDescription = new FormControl(this.addbooks.bookDescription, [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern("[a-zA-Z ]*"),
  ]);
  constructor(
    private bookservice: BookService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddbookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit() {}

  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  bookNameValidation() {
    return this.bookName.hasError("required") ? "must required" : "";
  }
  bookAuthorValidation() {
    return this.bookAuthor.hasError("required")
      ? "must required"
      : this.bookAuthor.hasError("bookAuthor")
      ? "Not a valid bookAuthor"
      : "";
  }
  bookPriceValidation() {
    return this.bookPrice.hasError("required") ? "must required" : "";
  }
  noOfBooksValidation() {
    return this.noOfBooks.hasError("required") ? "must required" : "";
  }
  bookDescriptionValidation() {
    return this.bookDescription.hasError("required") ? "must required" : "";
  }
  showSpinner = false;
  saveBook() {
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.bookservice.addBook(this.addbooks).subscribe(
        (response: any) => {
          const file = new FormData();
          this.selectedFile.imageName = this.selectedFile.name;
          file.append("file", this.selectedFile, this.selectedFile.name);
          this.http
            .post(
              "http://localhost:8080/book/uploadbookimage/" +
                response.obj.bookId,
              file,
              {
                headers: new HttpHeaders().set(
                  "token",
                  localStorage.getItem("token")
                ),
              }
            )
            .subscribe((response: any) => {
              if (response.status == 200 || response.status == "OK") {
                this.dialogRef.close();
                this.matSnackBar.open("Book added successfully", "undo", {
                  duration: 3000,
                });
              } else {
                this.dialogRef.close();
                this.matSnackBar.open("Book not added...try again", "undo", {
                  duration: 2500,
                });
              }
            });
        },
        (error: any) => {
          this.dialogRef.close();
          this.matSnackBar.open("something went wrong.....!", "undo", {
            duration: 2500,
          });
        }
      );
    }, 3000); //spinner
  }
}
