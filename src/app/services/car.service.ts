import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ICar, IPagination} from "../interfaces";
import {urls} from "../constants";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private trigger = new BehaviorSubject<boolean>(null);
  private carForUpdate = new BehaviorSubject<ICar>(null);

  constructor(private httpClient: HttpClient) {
  }

  getAll(page = 1): Observable<IPagination<ICar>> {
    return this.httpClient.get<IPagination<ICar>>(urls.cars.base, {params: {page}})
  }

  create(car: ICar): Observable<ICar> {
    return this.httpClient.post<ICar>(urls.cars.base, car).pipe(
      tap(() => {
        this.updateTrigger()
      })
    )
  }

  getById(id: number): Observable<ICar> {
    return this.httpClient.get<ICar>(urls.cars.byId(id))
  }

  updateById(id: number, car: ICar): Observable<ICar> {
    return this.httpClient.put<ICar>(urls.cars.byId(id), car).pipe(
      tap(() => {
        this.updateTrigger()
      })
    )
  }

  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(urls.cars.byId(id)).pipe(
      tap(() => {
        this.updateTrigger()
      })
    )
  }

  getTriggerStatus(): Observable<boolean> {
    return this.trigger.asObservable()
  }

  setCarForUpdate(car: ICar): void {
    this.carForUpdate.next(car)
  }

  getCarForUpdate(): Observable<ICar> {
    return this.carForUpdate.asObservable()
  }

  private updateTrigger(): void {
    this.trigger.next(!this.trigger.value)
  }
}
