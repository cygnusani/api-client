import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {CustomersComponent} from "./customers/customers.component"
import {AddCustomerComponent} from "./add-customer/add-customer.component";


const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  // for viewing all customers
  { path: 'customers', component: CustomersComponent },
  // for editing customer
  { path: 'edit/:id', component: AddCustomerComponent },
  // for adding new customer
  { path: 'add', component: AddCustomerComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
