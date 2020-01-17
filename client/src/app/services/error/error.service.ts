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
    return this.error.message ? this.error.message : this.error.toString()
  }

  getError(){
    return this.error
  }

  clear() {
    this.error = null
  }

  getClientErrorMessage(): string {
    return this.getErrorMessage()
  }

  getServerErrorMessage() {
    return this.getErrorMessage()
  }

  getClientErrorStack(error):string {
    return error.stack
  }

  setServerErrorMessage(error: Error) {
    this.add(error)
  }

  getServerErrorStack(error:Error): string {
    return error.stack
  }

  setClientErrorMessage(error: Error) {
    this.add({error})
  }
}
