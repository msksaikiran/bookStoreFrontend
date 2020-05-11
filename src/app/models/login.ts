export class Login {
    email:string;
    password:string;
    constructor(email:string,password:string){
        console.log("const"+email)
        this.email=email;
        
        this.password=password;  
       }
}