import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { environment } from "src/environments/environment";
import { HttpParams } from "@angular/common/http";
import { Subject, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BookService {
  constructor(private http_service: HttpService) {}
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
        environment.baseUrl +
          environment.ADD_TO_CART +
          localStorage.getItem("token") +
          "/" +
          bookId,
        {},
        {}
      )
      .pipe(
        tap(() => {
          this.subject.next();
        })
      );
  }
  removeFromCart(bookId: number) {
    let params = new HttpParams();
    params = params.append("bookId", bookId + "");
    return this.http_service
      .postMethod(
        environment.baseUrl +
          environment.REMOVE_FROM_CART +
          localStorage.getItem("token") +
          "/" +
          bookId,
        {},
        {}
      )
      .pipe(
        tap(() => {
          this.subject.next();
        })
      );
  }
  addToWishList(bookId: number) {
    let params = new HttpParams();
    params = params.append("bookId", bookId + "");
    return this.http_service
      .postMethod(
        environment.baseUrl +
          environment.ADD_TO_WISHLIST +
          localStorage.getItem("token") +
          "/" +
          bookId,
        {},
        {}
      )
      .pipe(
        tap(() => {
          this.subject.next();
        })
      );
  }
  removeFromWishList(bookId: number) {
    let params = new HttpParams();
    params = params.append("bookId", bookId + "");
    return this.http_service
      .postMethod(
        environment.baseUrl +
          environment.REMOVE_FROM_WISHLIST +
          localStorage.getItem("token") +
          "/" +
          bookId,
        {},
        {}
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
      environment.baseUrl + environment.GET_BOOKS_COUNT + "/" + "get",
      ""
    );
  }
}
