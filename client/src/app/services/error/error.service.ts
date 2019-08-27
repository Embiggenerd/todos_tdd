import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  error: any

  constructor() { }

  add(err: any){
    this.error
  }

  clear(){
    this.error = {}
  }

  getClientErrorMessage(error: Error): string {    
    return error.message ? 
           error.message : 
           error.toString();
  }

  getServerErrorMessage(error: HttpErrorResponse){
    // return navigator.onLine ?    
    //        error.message :
    //        'No Internet Connection';
    this.error = error
  }    
}
