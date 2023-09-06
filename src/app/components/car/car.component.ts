import {Component, Input} from '@angular/core';
import {ICar} from "../../interfaces";
import {CarService} from "../../services";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  @Input()
  car: ICar

  constructor(private carService: CarService) {
  }

  update() {
    this.carService.setCarForUpdate(this.car)
  }

  delete() {
    this.carService.deleteById(this.car.id).subscribe()
  }
}
