import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ViewcartService {
  baseurl = environment.baseUrl;
  constructor(private http: HttpClient) {}

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
}
