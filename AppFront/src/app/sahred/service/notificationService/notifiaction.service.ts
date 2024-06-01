import { Injectable } from '@angular/core';
import {Voiture} from "../../model/voitureModel/voiture.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notifiaction} from "../../model/notificationModel/notifiaction.model";

@Injectable({
  providedIn: 'root'
})
export class NotifiactionService {

  private _item:Notifiaction=new Notifiaction();
  private _items:Array<Notifiaction>=new Array<Notifiaction>();
  private url="http://localhost:8085/api/notification/";
  private _isAffaiche: boolean=false;
  constructor(private http:HttpClient) { }

  public save(): Observable<number> {
    return this.http.post<number>(this.url,this.item);
  }

  public getAll():Observable<Array<Notifiaction>>{
    return this.http.get<Array<Notifiaction>>(this.url);
  }

  public delete(code:String):Observable<number>{
    return this.http.delete<number>(`${this.url}code/${code}`);
  }
  getByCode(code: string):Observable<Notifiaction> {
    return this.http.get<Notifiaction>(`${this.url}code/${code}`);
  }
  getALlByCinClient(cin: string):Observable<Array<Notifiaction>> {
    return this.http.get<Array<Notifiaction>>(`${this.url}cinClient/${cin}`);
  }
  getALlByIceAgence(iceAgence: string):Observable<Array<Notifiaction>> {
    return this.http.get<Array<Notifiaction>>(`${this.url}iceAgence/${iceAgence}`);
  }

  getALlCinProp(cin: string):Observable<Array<Notifiaction>> {
    return this.http.get<Array<Notifiaction>>(`${this.url}proprAppartement/${cin}`);
  }

  public  update(notifiaction:Notifiaction):Observable<number>{
    return this.http.put<number>(this.url,notifiaction)
  }


  get item(): Notifiaction {
    return this._item;
  }

  set item(value: Notifiaction) {
    this._item = value;
  }

  get items(): Array<Notifiaction> {
    return this._items;
  }

  set items(value: Array<Notifiaction>) {
    this._items = value;
  }


  get isAffaiche(): boolean {
    return this._isAffaiche;
  }

  set isAffaiche(value: boolean) {
    this._isAffaiche = value;
  }
}
