import {Component, Input} from '@angular/core';
import {ICar} from "../../../../interfaces";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent {
  @Input()
  cars: ICar[]
  panelOpenState = false

  constructor() {
  }
}
