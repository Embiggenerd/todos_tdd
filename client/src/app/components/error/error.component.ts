import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent implements OnInit {
  message: string
  constructor(private errorService: ErrorService) { }

  ngOnInit() {
    this.getErrorMessage()
  }

  ngOnDesgroy(){
    this.clearErrorMessage()
  }

  getErrorMessage() {
    // this.message = this.errorService.error.error.message
    this.message = this.errorService.getErrorMessage()
  }

  clearErrorMessage(){
    this.errorService.clear()
  }
}
