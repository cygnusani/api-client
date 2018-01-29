import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MessageService} from './service/message/message.service';
import {AppRoutingModule} from './/app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {CustomersComponent} from './customers/customers.component';
import {CustomerService} from "./service/customer/customer.service";
import {NavbarComponent} from './navbar/navbar.component';
import {AddCustomerComponent} from './add-customer/add-customer.component';
import {ClassifiersService} from "./service/classifiers/classifiers.service";
import {SearchCustomerComponent} from './search-customer/search-customer.component';
import {FooterComponent} from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    NavbarComponent,
    AddCustomerComponent,
    SearchCustomerComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MessageService, CustomerService, ClassifiersService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
