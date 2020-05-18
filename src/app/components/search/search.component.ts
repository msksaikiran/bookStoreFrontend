import { Component, OnInit, Input } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpService } from "src/app/service/http.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from "@angular/router";
import { Book } from "src/app/models/book";
import { environment } from "src/environments/environment";
import { BookService } from "src/app/service/book.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  searchText: any;
  searchedBook: Book[];
  bookList: Array<Book> = [];
  constructor(
    private httpservice: HttpService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private bookservice: BookService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchText = params["searchText"];
    });
    this.bookservice.autoRefresh.subscribe(() => {
      this.searching();
      // this.getAvailableBooks();
    });
    this.searching();
    // this.getAvailableBooks();
  }
  searching() {
  this.httpservice
  .getMethod(
  environment.baseUrl + "book/bookorauthorname?text=" + this.searchText,
  this.httpservice.httpOptions
  )
  .subscribe((response: any) => {
  this.searchedBook = response.obj;
  });
  }
  // getAvailableBooks() {
    // this.bookservice.getAvailableBooks().subscribe((response: any) => {
      // this.bookList = response["obj"];
    // });
  // }
}
