import { Injectable } from "@angular/core";

import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private message: string;

  constructor(private _router: Router) {}

  /**
   * check for expiration and if token is still existing or not
   * @return {boolean}
   */
  isAuthenticated(): boolean {
    return localStorage.getItem("token") != null && !this.isTokenExpired();
  }

  // simulate jwt token is valid
  isTokenExpired(): boolean {
    return false;
  }
}
