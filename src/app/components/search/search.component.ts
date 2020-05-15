import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from 'src/app/service/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
searchText:any="";
searchedBook:Book[];
private obtainNotes = new BehaviorSubject([]);
  constructor(private httpservice: HttpService,
    private spinner: NgxSpinnerService,private route: ActivatedRoute,) { }

  ngOnInit(
  ) {
    this.route.queryParams.subscribe(params => {
      this.searchText=  params['searchText'];
    });
    this.searching();
  }
  searching() {
    console.log("books are ")
    console.log(this.searchText);
    this.httpservice
      .getSearchRequest(
        "book/bookorauthorname?text=" + this.searchText
      )
      .subscribe((response: any) => {
        this.searchedBook=response.obj;
        this.obtainNotes.next(response)
        console.log('response in search',response);
        
      });
  }
}
