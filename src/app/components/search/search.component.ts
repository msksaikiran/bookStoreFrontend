import { Component, OnInit, Input } from "@angular/core";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { Book } from 'src/app/models/book';

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  data: Array<Book> = [];
  constructor(private dashboard: DashboardComponent) {}

  ngOnInit() {
    this.dashboard.currentMessage.subscribe((response) => {
      (this.data = response), console.log(this.data);
    });
  }
}
