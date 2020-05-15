import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

/* Angular Flex Layout */
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgxPaginationModule } from "ngx-pagination";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { FooterComponent } from "./components/footer/footer.component";
import { BooksComponent } from "./components/books/books.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  MatInputModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatNavList,
} from "@angular/material";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ViewCartComponent } from "./components/view-cart/view-cart.component";
import { OrderSuccessComponent } from "./components/order-success/order-success.component";
import { GetbooksComponent } from "./components/getbooks/getbooks.component";
import { SortBooksPipe } from "./pipes/sort-books.pipe";

import { MatProgressBarModule } from "@angular/material/progress-bar";
import { ForgetpasswordComponent } from "./components/forgetpassword/forgetpassword.component";
import { RestpasswordComponent } from "./components/restpassword/restpassword.component";

import { MatRadioModule } from "@angular/material/radio";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { NgxSpinnerModule } from "ngx-spinner";

import { WhishlistComponent } from "./components/whishlist/whishlist.component";
import { OrderDetailsComponent } from "./components/order-details/order-details.component";
import { VerifyComponent } from "./components/verify/verify.component";
import { MatBadgeModule } from "@angular/material/badge";
import { SearchComponent } from "./components/search/search.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ViewCartComponent,
    FooterComponent,
    BooksComponent,
    OrderSuccessComponent,
    GetbooksComponent,
    SortBooksPipe,
    ForgetpasswordComponent,
    RestpasswordComponent,
    WhishlistComponent,
    OrderDetailsComponent,
    VerifyComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatToolbarModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatRadioModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatBadgeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
