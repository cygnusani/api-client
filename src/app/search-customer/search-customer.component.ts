import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Customer} from "../model/customer";
import {CustomerService} from "../service/customer/customer.service";

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {

  customers$: Observable<Customer[]>;
  private searchTerms = new Subject<string>();

  constructor(private customerService: CustomerService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
    console.log("Searching...");
  }

  ngOnInit(): void {
    this.customers$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.customerService.searchForCustomers(term)),
    );
  }
}
