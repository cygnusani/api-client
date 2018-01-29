import {Injectable} from '@angular/core';
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {catchError, tap} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "../message/message.service";
import {Customer} from "../../model/customer";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class CustomerService {

  private customersUrl = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  /** GET customer by id. Will 404 if id not found */
  getCustomerById(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(() => this.log(`fetched customer id=${id}`)),
      catchError(this.handleError<Customer>(`getCustomerById id=${id}`))
    );
  }

  /** GET customer from the server */
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl)
      .pipe(
        tap(() => this.log(`fetched customers`)),
        catchError(this.handleError('getCustomers', []))
      );
  }

  /** POST: add or update the customer */
  postCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl, customer, httpOptions).pipe(
      tap(() => this.log(`post customer`)),
      catchError(this.handleError<Customer>('postCustomer'))
    );
  }

  /** DELETE: delete the customer from the server */
  deleteCustomer(customer: Customer | number): Observable<Customer> {
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.customersUrl}/${id}`;

    return this.http.delete<Customer>(url, httpOptions).pipe(
      tap(() => this.log(`deleted customer id=${id}`)),
      catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }

  /** GET customers whose name contains search term */
  searchForCustomers(term: string): Observable<Customer[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    const url = `${this.customersUrl}/search`;
    return this.http.get<Customer[]>(url, {params: {'key': term}}).pipe(
      tap(() => this.log(`found customers matching "${term}"`)),
      catchError(this.handleError<Customer[]>('searchForCustomers', []))
    );
  }

  /** Log a CustomerService message with the MessageService */
  private log(message: string) {
    this.messageService.add('CustomerService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TOD0: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TOD0: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
