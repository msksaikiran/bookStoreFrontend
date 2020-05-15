import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  token:String
  constructor(private http: HttpClient) {}
  public postMethod(url: string, body: any, options: any): Observable<any> {
    return this.http.post(url, body, options);
  }
  public getMethod(url: string, options: any): Observable<any> {
    return this.http.get(url, options);
  }
  public putMethod(url: string, body: any, options: any): Observable<any> {
    return this.http.put(url, body, options);
  }
  public deleteMethod(url: string, options: any): Observable<any> {
    return this.http.delete(url, options);
  }
  public httpOptions = {
    headers: new HttpHeaders({
      "content-type": "application/json",
      token: localStorage.getItem("token"),
    }),
  };
  baseurl = environment.baseUrl;
 
  public postRequest(url :any, data: any ):any{
    return this.http.post("http://localhost:8080/" + url,data);
  }
  public putRequestForget(url, data) {
    return this.http.post("http://localhost:8080/" + url, data);
  }
  
  public putRequestReset(url,data){
    this.token=localStorage.getItem("token");
    console.log(this.token)
    return this.http.post("http://localhost:8080/"+ url,data,{ headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
  } 
  public  getSearchRequest(url){
    return this.http.get("http://localhost:8080/"+ url,{ headers: new HttpHeaders().set('token', localStorage.getItem('token')) });
  }
  public  putRequestverify(role:any,token:any){
    return this.http.get(environment.baseUrl+ role+environment.VERIFY_URL+token);
  }
  
}
