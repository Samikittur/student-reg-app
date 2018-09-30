import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class DataService {
    private subject = new Subject<boolean>();
    private Obj = new Subject<Object>();

    sendData(message: boolean) {
        this.subject.next(message);
    }

    sendDataObj(message: Object) {
        this.Obj.next(message);
    }

    clearData() {
        this.subject.next();
    }

    getData(): Observable<boolean> {
        return this.subject.asObservable();
    }
    getDataObj() {
        return this.Obj.asObservable();
    }
}
