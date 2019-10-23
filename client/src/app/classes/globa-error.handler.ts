import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LogService } from '../services/log/log.service';
import { ErrorService } from '../services//error/error.service';
import { NotificationService } from '../services/notification/notification.service';

/**
 * GlobalErrorHandler 
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }
  
  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LogService);
    const notifier = this.injector.get(NotificationService);

    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) { // Server error
      errorService.setServerErrorMessage(error)
      message = errorService.getServerErrorMessage();
      notifier.showError()
    } else { // Client Error
      console.log('clientErrorz', error)
      errorService.setClientErrorMessage(error)
      message = errorService.getClientErrorMessage(error);
      notifier.showError()
    }
    logger.logError(message, stackTrace);
  }
}
