import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewserviceService {

  result:boolean = true;
  subject = new Subject();
  
  constructor() { }
 
getView() 
{
  this.gridview();
  return this.subject.asObservable();
}

gridview()
{
  if(this.result)
  {
    this.subject.next({data:"column"});
    this.result = false;
  }
  else
  {
    this.subject.next({data:"row"});
    this.result = true;
  }
} 
}

