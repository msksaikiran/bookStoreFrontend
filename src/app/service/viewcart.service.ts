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
  token: String;
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
    this.token = localStorage.getItem("token");
    return this.http.get(this.baseurl + url, {
      headers: new HttpHeaders().set("token", localStorage.getItem("token")),
    });
  }
  public putRequest(url: any, data: any): any {
    this.token = localStorage.getItem("token");
    return this.http.put(this.baseurl + url, data, {
      headers: new HttpHeaders().set("token", localStorage.getItem("token")),
    });
  }
  public deleteRequest(url: any, data: any): any {
    return this.http.delete(this.baseurl + url, data);
  }
}
