import { Component, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { Setpassword } from 'src/app/models/setpassword';

@Component({
  selector: 'app-restpassword',
  templateUrl: './restpassword.component.html',
  styleUrls: ['./restpassword.component.scss']
})
export class RestpasswordComponent implements OnInit {
  setpassword:Setpassword = new Setpassword();
  password = new FormControl(this.setpassword.password, [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
  cpassword= new  FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(15)])
  constructor() { }

  ngOnInit() {
  }
/**
   * Password Validation
   */
  getErrorPassword(){
    return this.password.hasError('required') ? 'You must enter a value':
    this.password.hasError('password') ? 'Min 6 Elements':'';
  }
  getErrorcPassword(){
    return this.password.hasError('required') ? 'You must enter a value':
    this.password.hasError('password') ? 'Min 6 Elements':'';
  }
}
