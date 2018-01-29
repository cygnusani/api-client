import {Component, OnInit} from '@angular/core';
import {Customer} from "../model/customer";
import {CustomerService} from "../service/customer/customer.service";
import {Phone} from "../model/phone";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];
  customer: Customer;
  phones: Phone[];


  // When Angular creates a HeroesComponent, the Dependency Injection system sets
  // the heroService parameter to the singleton instance of HeroService
  constructor(private customerService: CustomerService) {
  }

  // a lifecycle hook, called shortly after creating a component
  // a good place to put initialization logic
  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(): void {
    // Then subscribe passes the emitted array to the callback, which sets the component's heroes property
    // This asynchronous approach will work when the HeroService requests heroes from the server
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers);
  }

  getMoreInfo(customer: Customer): void {
    this.customer = customer;
    this.phones = this.customer.phones;
  }

  selectCustomerToDeletion(customer: Customer) {
    this.customer = customer;
  }

  // Although the component delegates hero deletion to the HeroService, it remains responsible for updating its own
  // list of heroes. The component's delete() method immediately removes the hero-to-delete from that list,
  // anticipating that the HeroService will succeed on the server.
  delete(): void {
    this.customers = this.customers.filter(h => h !== this.customer);
    this.customerService.deleteCustomer(this.customer).subscribe();
    this.customer = null;
  }
}
