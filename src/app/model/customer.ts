import {Phone} from "./phone";

export class Customer {
  id: number;
  firstName: string;
  lastName: string;
  code: string;
  type: string;
  phones: Phone[];

  constructor(id: number, firstName: string, lastName: string, code: string, type: string, phones: Phone[]) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.code = code;
    this.type = type;
    this.phones = phones;
  }
}
