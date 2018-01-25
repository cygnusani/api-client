import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageService } from './service/message/message.service';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService }  from './in-memory-data.service';
import { CustomersComponent } from './customers/customers.component';
import { CustomerService} from "./service/customer/customer.service";
import { NavbarComponent } from './navbar/navbar.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ClassifiersService } from "./service/classifiers/classifiers.service";
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { FooterComponent } from './footer/footer.component';


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
    HttpClientModule,
    /* The HttpClientInMemoryWebApiModule module intercepts HTTP requests
       and returns simulated server responses.
       Remove it when a real server is ready to receive requests. */
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [MessageService, CustomerService, ClassifiersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
