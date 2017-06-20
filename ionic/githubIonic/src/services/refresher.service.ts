import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
@Injectable()
export class RefresherService {
    refresher: Subject<any>

    constructor() {
        this.refresher = new Subject();
        Observable.timer(1000, 7000).subscribe(data => {
            this.refresher.next(data);
        })
    }
}

