import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Coordinates } from '../coordinates';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  private subject: Subject<Coordinates> = new Subject();

  constructor(
    private httpClient: HttpClient
  ) {
    this.fetchCoordinates();
    setInterval(() => {
      this.fetchCoordinates();
    }, 10 * 1000);
  }

  private fetchCoordinates() {
    this.httpClient.get('http://api.open-notify.org/iss-now.json').subscribe((val: any) => {
      const coordinates = new Coordinates(val.iss_position.latitude, val.iss_position.longitude);
      this.subject.next(coordinates);
    });
  }

  getCoordinates() {
    return this.subject.asObservable();
  }
}
