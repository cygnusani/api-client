import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  constructor() { }

  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  remove(message: string) {
    const index = this.messages.indexOf(message);
    this.messages.splice(index, 1);
  }

  clear() {
    this.messages = [];
  }
}
