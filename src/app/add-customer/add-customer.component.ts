import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {CustomerService} from "../service/customer/customer.service";
import {Customer} from "../model/customer";
import {ClassifiersService} from "../service/classifiers/classifiers.service";
import {Phone} from "../model/phone";

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  @Input() customer: Customer;

  customerTypes: string[];
  phoneTypes: string[];

  constructor(private route: ActivatedRoute,
              private classifiersService: ClassifiersService,
              private customerService: CustomerService,
              private location: Location) {
  }

  ngOnInit() {
    this.getCustomerTypes();
    this.getPhoneTypes();
    this.getCustomer();
  }

  getCustomer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id != 0) {
      this.customerService.getCustomerById(id)
        .subscribe(customer => this.customer = customer);
    } else {
      this.customer = new Customer(null, '', '', '', '', []);
    }
  }

  getCustomerTypes() {
    this.classifiersService.getCustomerTypes()
      .subscribe(types => this.customerTypes = types);
  }

  getPhoneTypes() {
    this.classifiersService.getPhoneTypes()
      .subscribe(types => this.phoneTypes = types);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.customer.id == null) {
      this.customerService.addCustomer(this.customer)
        .subscribe(() => this.goBack());
    } else {
      this.customerService.updateCustomer(this.customer)
        .subscribe(() => this.goBack());
    }
    console.log("customer saved");
  }

  clear(): void {
    this.customer.id = null;
    this.customer.firstName = '';
    this.customer.lastName = '';
    this.customer.code = '';
    this.customer.type = '';
    this.customer.phones = [];
    console.log("fields cleared");
  }

  addPhone(): void {
    this.customer.phones.push(new Phone(null, '', ''));
    console.log("phone created");
  }

  deletePhone(phone: Phone): void {
    const index = this.customer.phones.indexOf(phone);
    this.customer.phones.splice(index, 1);
    console.log("phone deleted");
  }

}
