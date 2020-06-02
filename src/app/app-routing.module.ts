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
import { AddbookComponent } from "./components/addbook/addbook.component";
import { SellerbooksComponent } from "./components/sellerbooks/sellerbooks.component";
import { AdminComponent } from "./components/admin/admin.component";
//import { RatingComponent } from "./components/rating/rating.component";
import { VerifyconfrimComponent } from "./components/verifyconfrim/verifyconfrim.component";
import { RatingreviewComponent } from "./components/ratingreview/ratingreview.component";
import { AdmindashboardComponent } from "./components/admindashboard/admindashboard.component";
import { DisApprovedBooksComponent } from "./components/dis-approved-books/dis-approved-books.component";
import { GiverateComponent } from "./components/giverate/giverate.component";
import { SellerdashboardComponent } from "./components/sellerdashboard/sellerdashboard.component";

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
    path: "verifybook",
    component: VerifyconfrimComponent,
  },
  {
    path: ":role/registration/verify/:token",
    component: VerifyComponent,
  },
  {
    path: "seller/books",
    component: SellerdashboardComponent,
  },
  {
    path: "admin",
    component: AdmindashboardComponent,
    children: [
      {
        path: "books",
        component: AdminComponent,
      },
      {
        path: "disapprovebooks",
        component: DisApprovedBooksComponent,
      },
    ],
  },
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "", redirectTo: "/books", pathMatch: "full" },
      { path: "books", component: GetbooksComponent },
      { path: "books/search", component: SearchComponent },
      {
        path: "books/viewcart",
        //canActivate: [AuthGuardService],
        component: ViewCartComponent,
      },
      {
        path: "books/ordersucess/:orderId",
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
      {
        path: "books/rating/:bookId",
        component: RatingreviewComponent,
      },
      {
        path: "books/ratingandreview/:bookId",
        component: GiverateComponent,
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
