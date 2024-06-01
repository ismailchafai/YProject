import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Paiement} from "../../model/communModel/paiementDto.model";

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  private _item:Paiement =new Paiement();
  private _items:Array<Paiement>=new Array<Paiement>()
  private url='http://localhost:8085/api/paiement/'
  constructor(private http:HttpClient) { }

  public save(): Observable<number> {
    return this.http.post<number>(this.url,this.item);
  }

  public getAll():Observable<Array<Paiement>>{
    return this.http.get<Array<Paiement>>(this.url);
  }

  public delete(ref:String):Observable<any>{
    return this.http.delete<number>(`${this.url}ref/${ref}`);
  }

  public update(paiement:Paiement):Observable<any>{
    return this.http.put(this.url,paiement)
  }


  get item(): Paiement {
    return this._item;
  }

  set item(value: Paiement) {
    this._item = value;
  }

  get items(): Array<Paiement> {
    return this._items;
  }

  set items(value: Array<Paiement>) {
    this._items = value;
  }
}

