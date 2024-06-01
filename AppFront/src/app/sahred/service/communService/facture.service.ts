import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Facture} from "../../model/communModel/facture.model";

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  public _item: Facture = new Facture();
  public _items:Array<Facture>=new Array<Facture>();

  constructor(private http: HttpClient) {}
  public save(): Observable<any> {
    return this.http.post<number>("http://localhost:8085/api/facture/", this.item);
  }

  public getAll():Observable<Array<Facture>>{
    return this.http.get<Array<Facture>>("http://localhost:8085/api/facture/");
  }

  public delete(ref:String):Observable<any>{
    return this.http.delete<number>(`http://localhost:8085/api/facture/ref/${ref}`);
  }

  public  update(propritaire:Facture):Observable<any>{
    return this.http.put("http://localhost:8085/api/facture/",propritaire)

  }


  get items(): Array<Facture> {
    return this._items;
  }

  set items(value: Array<Facture>) {
    this._items = value;
  }

  get item(): Facture {
    return this._item;
  }

  set item(value: Facture) {
    this._item = value;
  }


  get(ref: string):Observable<Facture> {
    return this.http.get<Facture>(`http://localhost:8085/api/facture/ref/${ref}`);

  }
}
