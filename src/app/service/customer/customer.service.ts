import { Injectable } from '@angular/core';
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {catchError, tap} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "../message/message.service";
import {Customer} from "../../model/customer";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CustomerService {

  private customersUrl = 'api/customers';  // URL to web api

  // This is a typical "service-in-service" scenario: you inject the MessageService
  // into the HeroService which is injected into the HeroesComponent
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET customer by id. Will 404 if id not found */
  getCustomerById(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(_ => this.log(`fetched customer id=${id}`)),
      catchError(this.handleError<Customer>(`getCustomerById id=${id}`))
    );
  }

  /** GET customer from the server */
  getCustomers (): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl)
      .pipe(
        // The HeroService methods will tap into the flow of observable values and send a message (via log()) to the
        // message area at the bottom of the page. They'll do that with the RxJS tap operator, which looks at the
        // observable values, does something with those values, and passes them along. The tap call back doesn't touch
        // the values themselves.
        tap(heroes => this.log(`fetched customers`)),
        // The catchError() operator intercepts an Observable that failed.
        // It passes the error an error handler that can do what it wants with the error.
        // The following handleError() method reports the error and then returns an innocuous result so that the application keeps working
        catchError(this.handleError('getCustomers', []))
      );
  }

  /** POST: add a new customer to the server */
  addCustomer (hero: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl, hero, httpOptions).pipe(
      tap((hero: Customer) => this.log(`added customer w/ id=${hero.id}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }

  /** PUT: update the customer on the server */
  updateCustomer (hero: Customer): Observable<any> {
    return this.http.put(this.customersUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }

  /** DELETE: delete the customer from the server */
  deleteCustomer (hero: Customer | number): Observable<Customer> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.customersUrl}/${id}`;

    return this.http.delete<Customer>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }

  /** GET customers whose name contains search term */
  searchForCustomers(term: string): Observable<Customer[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Customer[]>(`api/customers/?firstName=${term}`).pipe(
      tap(_ => this.log(`found customers matching "${term}"`)),
      catchError(this.handleError<Customer[]>('searchForCustomers', []))
    );
  }

  /** Log a CustomerService message with the MessageService */
  private log(message: string) {
    this.messageService.add('CustomerService: ' + message);
  }

  // Because each service method returns a different kind of Observable result, errorHandler() takes a type parameter
  // so it can return the safe value as the type that the app expects.
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
