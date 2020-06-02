 
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  /**
   * A BehaviorSubject is a type of observable 
   * When we subscribe to it, it will immediately return the last value that was emitted immediately 
   * 
   */
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  /**
   * 
   * @param message 
   * changing message here
   */
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
}