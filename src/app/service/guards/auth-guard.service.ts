import { Injectable } from "@angular/core";

import { AuthService } from "src/app/service/auth.service";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route,
  CanActivateChild,
} from "@angular/router";
import { Observable } from "rxjs";
import decode from "jwt-decode";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | import("@angular/router").UrlTree
    | Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    if (this._authService.isAuthenticated()) {
      //validating the token by decoding.
      try {
        decode(localStorage.getItem("token"));
      } catch (error) {
        this.snackBar.open("Login Failed Invaid token", "undo", {
          duration: 25000,
        });
      }

      return true;
    }

    // navigate to login page
    this._router.navigate(["/login"]);
    return false;
  }
  //throw new Error("Method not implemented.");
}

//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

//     if (this._authService.isAuthenticated()) {

//       //validating the token by decoding.
//       try {
//         decode(localStorage.getItem('token'));
//       } catch (error) {
//         this.snackBar.open("Login Failed Invaid token", "undo", { duration: 25000 });
//       }

//         return true;
//     }

//     //navigate to login page
//     this._router.navigate(['/login']);
//     return false;
//   }

// }
