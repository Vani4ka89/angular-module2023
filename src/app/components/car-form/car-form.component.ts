import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CarService} from "../../services";
import {ICar} from "../../interfaces";

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {
  form: FormGroup
  carForUpdate: ICar

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
    this.carService.getCarForUpdate().subscribe(value => {
      this.carForUpdate = value
      if (value) {
        const carForUpdateValue = {...value};
        delete carForUpdateValue.id;
        this.form.setValue(carForUpdateValue)
      }
    })
    this._initForm()
  }

  _initForm() {
    this.form = new FormGroup({
      brand: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Zа-яА-яёЁіІїЇ]{1,20}$/)
      ]),
      price: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(1000000)
      ]),
      year: new FormControl(1990, [
        Validators.required,
        Validators.min(1990),
        Validators.max(new Date().getFullYear())
      ])
    })
  }

  save(): void {
    this.carService.create(this.form.value).subscribe(() => {
      this.form.reset();
    })
  }

  update(): void {
    this.carService.updateById(this.carForUpdate.id, this.form.value).subscribe(() => {
      this.carService.setCarForUpdate(null);
      this.form.reset();
    })
  }
}
