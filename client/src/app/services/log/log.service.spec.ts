import { TestBed } from '@angular/core/testing';

import { LogService } from './log.service';

describe('LogService', () => {
  let service: LogService
  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.get(LogService);
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add message', () => {
    const msg = 'hello worlds'
    service.add(msg)
    expect(service.messages[0]).toContain(msg)
  })

  it('should clear messages', () => {
    const msg = 'hello worlds'
    service.add(msg)

    expect(service.messages.length).toBe(1)
    service.clear()
    expect(service.messages.length).toBe(0)
  })

  it('should log message', () => {
    console.log = jasmine.createSpy("log");
    const msg = 'lalala'
    service.logError(msg, '')

    const expectedOutput = 'LoggingService: lalala'

    expect(console.log).toHaveBeenCalledWith(expectedOutput);
  })
});
