import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { BookService } from "src/app/service/book.service";
import { Book } from "src/app/models/book";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-getbooks",
  templateUrl: "./getbooks.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./getbooks.component.scss"],
})
export class GetbooksComponent implements OnInit {
  bookList: Array<Book> = [];
  sort: any = "Sort by relevance";
  sortTech1: any = "Price : Low to High";
  sortTech2: any = "Price : High to Low";
  sortTech3: any = "Newest Arrivals";
  length: number = 0;
  page: number = 1;
  endPage: number = 1;
  pages: Array<Number> = [];
  constructor(
    private bookService: BookService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.sort;
    this.getBooksCount();
    this.getAvailableBooks();
  }
  nextPage() {
    this.page = this.page + 1;
    this.doSorting(this.sort);
  }
  previousPage() {
    this.page = this.page - 1;
    this.doSorting(this.sort);
  }
  getBooksCount() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.bookService.getBooksCount().subscribe((response: any) => {
      this.length = response["obj"];
      if (this.length > 10) {
        for (var i = 1; i <= this.length / 12 + 1; i++) {
          this.pages[i] = i;
        }
        this.endPage = this.pages.length - 2;
      }
    });
  }
  doSorting(option: any) {
    this.sort = option;
    if (option == "Sort by relevance") {
      this.sortTech1 = "Price : Low to High";
      this.sortTech2 = "Price : High to Low";
      this.sortTech3 = "Newest Arrivals";
      this.getAvailableBooksOfPage(this.page);
    }
    if (option == "Price : Low to High") {
      this.sortTech1 = "Price : High to Low";
      this.sortTech2 = "Sort by relevance";
      this.sortTech3 = "Newest Arrivals";
      this.bookService
        .getBooksSortedByPriceLow(this.page)
        .subscribe((response: any) => {
          this.bookList = response["obj"];
        });
    }
    if (option == "Price : High to Low") {
      this.sortTech1 = "Price : Low to High";
      this.sortTech2 = "Sort by relevance";
      this.sortTech3 = "Newest Arrivals";
      this.bookService
        .getBooksSortedByPriceHigh(this.page)
        .subscribe((response: any) => {
          this.bookList = response["obj"];
        });
    }
    if (option == "Newest Arrivals") {
      this.sortTech1 = "Price : Low to High";
      this.sortTech2 = "Price : High to Low";
      this.sortTech3 = "Sort by relevance";
      this.bookService
        .getBooksSortedByArrivals(this.page)
        .subscribe((response: any) => {
          this.bookList = response["obj"];
        });
    }
  }
  getAvailableBooks() {
    this.bookService.getAvailableBooks().subscribe((response: any) => {
      this.bookList = response["obj"];
    });
  }
  getAvailableBooksOfPage(pageNo: number) {
    this.bookService
      .getAvailableBooksOfPage(pageNo)
      .subscribe((response: any) => {
        this.bookList = response["obj"];
        this.page = pageNo;
      });
  }
}
