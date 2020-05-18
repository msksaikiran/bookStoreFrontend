import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AddressService {
  baseurl = environment.baseUrl;
  token: string;
  constructor(private http: HttpClient) {}

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
    return this.http.put(this.baseurl + url, data);
  }
  public deleteRequest(url: any, data: any): any {
    return this.http.delete(this.baseurl + url, data);
  }
}
