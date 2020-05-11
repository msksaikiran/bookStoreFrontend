import { Component, OnInit, Input } from "@angular/core";

import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"],
})
export class BooksComponent implements OnInit {
  @Input() image: String;
  isAdded: boolean = false;
  isOutOfStock: boolean = false;
  constructor(private _matSnackBar: MatSnackBar) {}

  ngOnInit() {}
  addToCart() {
    this.isAdded = true;
  }
  removeFromCart() {
    this.isAdded = false;
  }
}
