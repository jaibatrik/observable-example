import { Component, OnInit } from '@angular/core';
import { ObservableService } from './observable.service';
import { Coordinates } from 'src/coordinates';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ISS current position updated every 10 seconds';
  coordinates: Coordinates;

  constructor(
    private service: ObservableService
  ) {}

  ngOnInit() {
    this.service.getCoordinates().subscribe(val => {
      this.coordinates = val;
    });
  }
}
