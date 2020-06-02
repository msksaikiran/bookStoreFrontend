import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-order-success",
  templateUrl: "./order-success.component.html",
  styleUrls: ["./order-success.component.scss"],
})
export class OrderSuccessComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  orderId: any;
  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get("orderId");
  }
  onContinue() {
    this.router.navigate(["/books"]);
  }
}
