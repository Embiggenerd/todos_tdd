import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LogService } from '../services/log/log.service';
import { ErrorService } from '../services//error/error.service';
import { NotificationService } from '../services/notification/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }
  
  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LogService);
    const notifier = this.injector.get(NotificationService);

    let message;
    let stackTrace;
    if (error instanceof HttpErrorResponse) {
      // Server error
      console.log('httpError')
      message = errorService.getServerErrorMessage(error);
      //stackTrace = errorService.getServerErrorStackTrace(error);
      notifier.showError(message);
    } else {
      // Client Error
      console.log('clientError')
      message = errorService.getClientErrorMessage(error);
      notifier.showError(message);
    }
    // Always log errors
    logger.logError(message, stackTrace);
    console.error(error);
  }
}
