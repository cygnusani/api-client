import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {CustomersComponent} from "./customers/customers.component"
import {AddCustomerComponent} from "./add-customer/add-customer.component";

// Routes tell the router which view to display when a user clicks a link or pastes a URL into
// the browser address bar
// A typical Angular Route has two properties:
// path: a string that matches the URL in the browser address bar.
// component: the component that the router should create when navigating to this route
const routes: Routes = [
  // To make the app navigate to the dashboard automatically
  // This route redirects a URL that fully matches the empty path to the route whose path is '/dashboard'
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{ path: 'dashboard', component: DashboardComponent },
  // for viewing all customers
  { path: 'customers', component: CustomersComponent }, //HeroesComponent
  // The colon (:) in the path indicates that :id is a placeholder for a specific hero id
  // for editing customer
  { path: 'edit/:id', component: AddCustomerComponent },
  // for adding new customer
  { path: 'add', component: AddCustomerComponent }
];

// You generally don't declare components in a routing module
// so you can delete the @NgModule.declarations array and delete CommonModule references too
@NgModule({
  // Add RouterModule to the @NgModule.imports array and configure it with the routes in one step
  // by calling RouterModule.forRoot() within the imports array
  // The method is called forRoot() because you configure the router at the application's root level.
  // The forRoot() method supplies the service providers and directives needed for routing, and performs
  // the initial navigation based on the current browser URL
  imports: [ RouterModule.forRoot(routes) ],
  // Exporting RouterModule makes router directives available for use in the AppModule components
  // that will need them
  exports: [RouterModule]
})
export class AppRoutingModule { }
