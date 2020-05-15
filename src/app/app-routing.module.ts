import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ViewCartComponent } from "./components/view-cart/view-cart.component";
import { OrderSuccessComponent } from "./components/order-success/order-success.component";
import { GetbooksComponent } from "./components/getbooks/getbooks.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { ForgetpasswordComponent } from "./components/forgetpassword/forgetpassword.component";
import { RestpasswordComponent } from "./components/restpassword/restpassword.component";
import { AuthGuardService } from "./service/guards/auth-guard.service";
import { WhishlistComponent } from "./components/whishlist/whishlist.component";
import { BooksComponent } from "./components/books/books.component";
import { OrderDetailsComponent } from "./components/order-details/order-details.component";
import { SearchComponent } from "./components/search/search.component";
import { VerifyComponent } from "./components/verify/verify.component";

const routes: Routes = [
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "forgetpassword",
    component: ForgetpasswordComponent,
  },
  {
    path: ":role/resetpassword/:token",
    component: RestpasswordComponent,
  },
  {
    path: ":role/registration/verify/:token",
    component: VerifyComponent,
  },
  {
    path: "",
    component: DashboardComponent,
    //canActivateChild: [AuthGuardService],
    children: [
      { path: "", redirectTo: "/books", pathMatch: "full" },
      { path: "books", component: GetbooksComponent },
      { path: "books/search", component: SearchComponent },
      {
        path: "books/viewcart",
        canActivate: [AuthGuardService],
        component: ViewCartComponent,
      },
      {
        path: "books/ordersucess",
        canActivate: [AuthGuardService],
        component: OrderSuccessComponent,
      },
      {
        path: "books/whishlist",
        component: WhishlistComponent,
      },
      {
        path: "books/orderdetails",
        component: OrderDetailsComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
function newFunction(): string {
  return "setPassword";
}
