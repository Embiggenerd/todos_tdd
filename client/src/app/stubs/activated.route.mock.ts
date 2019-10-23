import { Component, Directive, Injectable, Input } from '@angular/core';

import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject, BehaviorSubject } from 'rxjs';

@Injectable()
export class ActivatedRouteStub {

    // ActivatedRoute.params is Observable
    private subject = new BehaviorSubject(this.testParams);
    params = this.subject.asObservable();

    // Test parameters
    private _testParams: {};
    get testParams() { return this._testParams; }
    set testParams(params: {}) {
        this._testParams = params;
        this.subject.next(params);
    }

    // ActivatedRoute.snapshot.params
    get snapshot() {
        return {
            paramMap: convertToParamMap(this.testParams),
            params:  this.testParams
        };
    }
}