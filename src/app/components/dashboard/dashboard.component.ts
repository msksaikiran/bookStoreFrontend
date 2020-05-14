import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(private route: ActivatedRoute,private httpservice:HttpService, 
     private router: Router) {}

  visible: boolean;
  ngOnInit() {
    if (localStorage.getItem("token") != null) {
      this.visible = true;
    }
  }
  myInput = new FormControl();
  private obtainNotes = new BehaviorSubject([]);
 

  onBook() {
    this.router.navigate(["books"]);
  }
  onCart() {
    this.router.navigate(["books/viewcart"]);
  }
  onwhishlist() {
    this.router.navigate(["books/whishlist"]);
  }
  onOrderDetails() {
    this.router.navigate(["books/orderdetails"]);
  }
  onLogin() {
    this.router.navigate(["login"]);
  }
  onLogout() {
    localStorage.clear();
    this.router.navigate(["books"]);
  }
  searching() {
    console.log(this.myInput.value);
    this.httpservice.getSearchRequest("book/getBookByNameAndAuthor?title="+this.myInput.value).subscribe
    ((response:any)=>
    {
      this.obtainNotes.next(response)
      console.log(response)
      this.router.navigate(["login"]);
    })
      }
}
