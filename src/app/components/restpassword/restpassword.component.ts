import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { Setpassword } from 'src/app/models/setpassword';
import { HttpService } from 'src/app/service/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-restpassword',
  templateUrl: './restpassword.component.html',
  styleUrls: ['./restpassword.component.scss']
})
export class RestpasswordComponent implements OnInit {
  setpassword:Setpassword = new Setpassword();
  password = new FormControl(this.setpassword.password, [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
  cpassword= new  FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(15)])
  token: string;
  person=String;
  constructor( private httpservice:HttpService,
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar:MatSnackBar
    ) { }

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
  onChange(mrChange: MatRadioChange) {
    console.log(mrChange.value);
   this.person=mrChange.value
  }
  onreset(){
    if(this.cpassword.value===this.password.value){
      console.log("cpassword and pass same===============>");
      this.token=localStorage.getItem("token")
      this.httpservice.putRequestReset(this.person+"/resetPassword",this.setpassword).subscribe(
        (response:any)=>{
          console.log("after responce")
          if(response!=null)
          {
            console.log(response);
            localStorage.setItem("token",response.token);
  
            this.snackbar.open(
              "ResetPassword Successfull","undo",
              
               { duration: 2500 }
           )
             this.router.navigate(['/login'])
   
          }else {
           console.log(response);
           this.snackbar.open(
             "Reset Failed",
             "undo",
             { duration: 2500 }
           )
         }
        }
   
       )
   
      }   
    else{
      console.log("cpassword and pass same45as6+43213===============>");
      this.snackbar.open(
        "mismatching passwords",
        "undo")
    }
  }
}