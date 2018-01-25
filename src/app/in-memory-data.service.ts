import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    var customers = [
      { id: 1, firstName: 'Jane', lastName: 'Doe', code: '123ABC', type: 'customer_type.private', phones: [
          { id: 1, value: '+37212345678', type: 'phone_type.mobile' },
          { id: 2, value: '+37223456789', type: 'phone_type.fixed' }]},
      { id: 2, firstName: 'John', lastName: 'Doe', code: '234BCD', type: 'customer_type.corporate', phones: [
          { id: 3, value: '+37223436345', type: 'phone_type.mobile' }]}
          ];
    const phoneTypes = ['phone_type.fixed', 'phone_type.mobile'];
    const customerTypes = ['customer_type.private', 'customer_type.corporate'];
    return {customers, phoneTypes, customerTypes};
  }
}
