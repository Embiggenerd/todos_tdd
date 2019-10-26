import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root',
})

export class LogService {
  messages: string[] = [];
 
  add(message: string) {
    this.messages.push(message);
  }
 
  clear() {
    this.messages = [];
  }

  logError(message: string, stack: string) {
    console.log('LoggingService: ' + message + stack);
}
}