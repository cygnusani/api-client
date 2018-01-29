import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {MessageService} from "../message/message.service";

@Injectable()
export class ClassifiersService {

  private customerTypesUrl = 'http://localhost:8080/api/classifiers/customer_types';
  private phoneTypesUrl = 'http://localhost:8080/api/classifiers/phone_types';

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  /** GET phone types from the server */
  getPhoneTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.phoneTypesUrl)
      .pipe(
        tap(() => this.log(`fetched phone types`)),
        catchError(this.handleError('getPhoneTypes', []))
      );
  }

  /** GET customer types from the server */
  getCustomerTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.customerTypesUrl)
      .pipe(
        tap(() => this.log(`fetched customer types`)),
        catchError(this.handleError('getCustomerTypes', []))
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
