import { Injectable } from '@angular/core';

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
}
