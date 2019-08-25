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
    // Send errors to server here
    console.log('LoggingService: ' + message);
}
}