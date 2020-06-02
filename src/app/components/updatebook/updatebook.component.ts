import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { Updatebook } from "src/app/models/updatebook";
import { BookService } from "src/app/service/book.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-updatebook",
  templateUrl: "./updatebook.component.html",
  styleUrls: ["./updatebook.component.scss"],
})
export class UpdatebookComponent implements OnInit {
  updateb: Updatebook = new Updatebook();
  bookName = new FormControl(this.data.bookName, [Validators.required]);
  bookAuthor = new FormControl(this.data.bookAuthor, [Validators.required]);
  bookPrice = new FormControl(this.data.bookPrice, [Validators.required]);
  noOfBooks = new FormControl(this.data.noOfBooks, [Validators.required]);
  bookDescription = new FormControl(this.data.bookDescription, [
    Validators.required,
  ]);
  action: string;
  local_data: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookservice: BookService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private http: HttpClient,
    public dialogRef: MatDialogRef<UpdatebookComponent>,
    private spinner: NgxSpinnerService
  ) {
    this.local_data = { ...data };
  }

  ngOnInit() {}
  showSpinner = false;
  update() {
    console.log("bookId---------->" + this.data.bookId);
    this.updateb.bookName = this.data.bookName;
    this.updateb.bookAuthor = this.data.bookAuthor;
    this.updateb.bookPrice = this.data.bookPrice;
    this.updateb.noOfBooks = this.data.noOfBooks;
    this.updateb.bookDescription = this.data.bookDescription;
    //this.dialogRef.close();
    this.spinner.show();
    this.showSpinner = true;
    setTimeout(() => {
      this.spinner.hide();
      this.bookservice.updateBook(this.data.bookId, this.updateb).subscribe(
        (response: any) => {
          if (response.status == 200 || response.status == "OK") {
            this.dialogRef.close({ data: this.updateb });
            this.matSnackBar.open("Book updated successfully", "undo", {
              duration: 3000,
            });
          } else {
            this.dialogRef.close();
            this.matSnackBar.open("Book not updated...try again", "undo", {
              duration: 2500,
            });
          }
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
