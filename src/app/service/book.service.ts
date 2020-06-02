import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { environment } from "src/environments/environment";
import { HttpParams, HttpHeaders, HttpClient } from "@angular/common/http";
import { Subject, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BookService {
  constructor(private http_service: HttpService, private http: HttpClient) {}
  private subject = new Subject<any>();
  private content = new BehaviorSubject<number>(0);
  public share = this.content.asObservable();
  public get autoRefresh() {
    return this.subject;
  }
  getReset(data: any, token: any, role: any) {
    return this.http_service.putMethod(
      environment.baseUrl + role + "/" + environment.RESET_URL + token,
      data,
      {}
    );
  }
  getAvailableSellerBooks() {
    return this.http_service
      .getMethod(
        environment.baseUrl + "seller/sellerbooks/?pageNo=" + 1,
        this.http_service.httpOptions
      )
      .pipe(
        tap(() => {
          this.subject.next();
        })
      );
  }
  getUnverifiedBooks() {
    return this.http_service
      .getbookMethod(environment.baseUrl + "/book/bookdetails/unverified", "")
      .pipe(
        tap(() => {
          this.subject.next();
        })
      );
  }
  getAvailableBooks() {
    let params = new HttpParams();
    params = params.append("pageNo", "1");
    return this.http_service.getMethod(
      environment.baseUrl + environment.BOOK_BASE_URL,
      { params: params }
    );
  }
  getAvailableBooksOfPage(pageNo: any) {
    let params = new HttpParams();
    params = params.append("pageNo", pageNo);
    return this.http_service.getMethod(
      environment.baseUrl + environment.BOOK_BASE_URL,
      { params: params }
    );
  }
  addToCart(bookId: number) {
    let params = new HttpParams();
    params = params.append("bookId", bookId + "");
    return this.http_service
      .postMethod(
        environment.baseUrl + environment.ADD_TO_CART + bookId,
        {},
        this.http_service.httpOptions
      )
      .pipe(
        tap(() => {
          this.subject.next();
        })
      );
  }
  addToWishList(bookId: number) {
    return this.http_service
      .postMethod(
        environment.baseUrl + environment.ADD_TO_WISHLIST + bookId,
        {},
        this.http_service.httpOptions
      )
      .pipe(
        tap(() => {
          this.subject.next();
        })
      );
  }
  getBooksSortedByPriceHigh(page: any) {
    let params = new HttpParams();
    params = params.append("pageNo", page);
    return this.http_service.getMethod(
      environment.baseUrl + environment.SORT_BY_HIGH_TO_LOW,
      { params: params }
    );
  }
  getBooksSortedByPriceLow(page: any) {
    let params = new HttpParams();
    params = params.append("pageNo", page);
    return this.http_service.getMethod(
      environment.baseUrl + environment.SORT_BY_LOW_TO_HIGH,
      { params: params }
    );
  }
  getBooksSortedByArrivals(page: any) {
    let params = new HttpParams();
    params = params.append("pageNo", page);
    return this.http_service.getMethod(
      environment.baseUrl + environment.SORT_BY_NEW_ARRIVALS,
      { params: params }
    );
  }
  getBooksCount() {
    return this.http_service.getMethod(
      environment.baseUrl + environment.GET_BOOKS_COUNT,
      ""
    );
  }
  isAddedTocart(bookId: number) {
    return this.http_service.getMethod(
      environment.baseUrl +
        environment.VERIFY_CART_BOOK +
        localStorage.getItem("token") +
        "/" +
        "?bookId=" +
        bookId,
      {}
    );
  }
  private _refreshNeeded$ = new Subject<void>();
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  public addBook(data: any): any {
    console.log("service add book");
    return this.http
      .post("http://localhost:8080/book/addbook", data, {
        headers: new HttpHeaders().set("token", localStorage.getItem("token")),
      })
      .pipe(
        tap(() => {
          this.subject.next();
        })
      );
  }
  public updateBook(url: any, data: any): any {
    console.log("service add book");
    return this.http.put("http://localhost:8080/book/update/" + url, data, {
      headers: new HttpHeaders().set("token", localStorage.getItem("token")),
    });
  }
  isAddedToWishList(bookId: number) {
    return this.http_service.getMethod(
      environment.baseUrl +
        environment.VERIFY_WHISHLIST_BOOK +
        localStorage.getItem("token") +
        "/" +
        "?bookId=" +
        bookId,
      {}
    );
  }
  public getAvailableBooksOfPageFromSeller(pageNo: any) {
    return this.http_service.getMethod(
      environment.baseUrl + "seller/sellerbooks/?pageNo=" + pageNo,
      this.http_service.httpOptions
    );
  }
  public getBookById(bookId: number) {
    return this.http_service.getMethod(
      environment.baseUrl + "book/bookdetails/" + bookId,
      {}
    );
  }
  public ratingandreview(bookId: Number, data: any) {
    return this.http_service
      .putMethod(
        environment.baseUrl + environment.WRITE_REVIEW + bookId,
        data,
        this.http_service.httpOptions
      )
      .pipe(
        tap(() => {
          this.subject.next();
        })
      );
  }
  public getratingandreview(bookId: number) {
    return this.http_service.getMethod(
      environment.baseUrl + environment.GET_REVIEWS + bookId,
      {}
    );
  }
}
