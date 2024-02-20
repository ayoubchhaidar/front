import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {






  constructor() { }

  private lastReadPageSubject = new BehaviorSubject<number>(0);
  public lastReadPage$ = this.lastReadPageSubject.asObservable();

  setLastReadPage(page: number): void {
    this.lastReadPageSubject.next(page);
  }


}
