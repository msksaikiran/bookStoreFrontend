import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  visible: boolean;
  ngOnInit() {
    if (localStorage.getItem("token") != null) {
      this.visible = true;
    }
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
    this.router.navigate(["books/orderdetails"]);
  }
}
