import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpService } from "./http.service";
import { BehaviorSubject, Subject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ViewcartService {
  baseurl = environment.baseUrl;
  constructor(private http: HttpClient, private http_service: HttpService) {}
  private subject = new Subject<any>();
  private content = new BehaviorSubject<number>(0);
  public share = this.content.asObservable();
  public get autoRefresh() {
    return this.subject;
  }
  public postRequest(url: any, data: any): any {
    return this.http.post(this.baseurl + url, data);
  }
  public getRequest(url: any): any {
    return this.http.get(this.baseurl + url);
  }
  public putRequest(url: any, data: any): any {
    return this.http.put(this.baseurl + url, data);
  }
  public deleteRequest(url: any, data: any): any {
    return this.http.delete(this.baseurl + url, data);
  }
  incrementQuantity(book: any, index: any) {
    return this.http_service
      .putMethod(
        environment.baseUrl +
          "cart/add_booksquantity_cart/" +
          localStorage.getItem("token") +
          "?bookId=" +
          book.bookId,
        book.quantitybto[index],
        {}
      )
      .pipe(
        tap(() => {
          this.subject.next();
        })
      );
  }
}
