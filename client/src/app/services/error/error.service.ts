import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private error: Error

  constructor() { }

  add(err: any) {
    this.error = err.error
  }

  getErrorMessage(){
    return this.error.message
  }

  getError(){
    return this.error
  }

  clear() {
    this.error = undefined
  }

  getClientErrorMessage(error: Error): string {
    return error.message ?
      error.message :
      error.toString();
  }

  getServerErrorMessage() {
    return this.getErrorMessage()
  }

  setServerErrorMessage(error: Error) {
    this.add(error)
  }
}
