import { Injectable } from '@angular/core';
import {Client} from "../../model/communModel/client.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reservation} from "../../model/communModel/reservation.model";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private _item: Reservation = new Reservation();
  private _items: Array<Reservation> = new Array<Reservation>()
  private url = "http://localhost:8085/api/safarent/manager/reservation/"

  constructor(private http: HttpClient) {
  }

  public save(): Observable<number> {
    return this.http.post<number>(this.url, this.item);
  }

  public getAll(): Observable<Array<Reservation>> {
    return this.http.get<Array<Reservation>>(this.url);
  }

  public delete(ref: String): Observable<number> {
    return this.http.delete<number>(`${this.url}ref/${ref}`);
  }
public getByRef(ref: String): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.url}ref/${ref}`);
  }

  public update(reservation: Reservation): Observable<number> {
    return this.http.put<number>(this.url, reservation)
  }

  public findReservationbyVoitureMatricule(matiricule:string):Observable<Array<Reservation>>{
    return this.http.get<Array<Reservation>>(`${this.url}reservationByVoiture/public/matricule/${matiricule}`)
  }

  public findReservationbyAppCode(code:string):Observable<Array<Reservation>>{
    return this.http.get<Array<Reservation>>(`${this.url}reservationByAppartement/public/code/${code}`)
  }


  get item(): Reservation {
    return this._item;
  }

  set item(value: Reservation) {
    this._item = value;
  }

  get items(): Array<Reservation> {
    return this._items;
  }

  set items(value: Array<Reservation>) {
    this._items = value;
  }

}
