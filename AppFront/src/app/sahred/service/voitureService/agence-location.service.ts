import { Injectable } from '@angular/core';
import {AgenceAppartement} from "../../model/appartemetModel/AgenceAppartement.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AgenceLocation} from "../../model/voitureModel/agence-location.model";
import {Voiture} from "../../model/voitureModel/voiture.model";
import {Client} from "../../model/communModel/client.model";

@Injectable({
  providedIn: 'root'
})
export class AgenceLocationService {


  public _item: AgenceLocation = new AgenceLocation();
  public _items:Array<AgenceLocation>=new Array<AgenceLocation>();
  public url="http://localhost:8085/api/agenceLocation/";
  constructor(private http: HttpClient) { }
  public save(): Observable<number> {
    return this.http.post<number>(this.url, this.item);
  }

  public getAll():Observable<Array<AgenceLocation>>{
    return this.http.get<Array<AgenceLocation>>(this.url);
  }

  public delete(iceAgLoc:number):Observable<any>{
    return this.http.delete<number>(`${this.url}iceAgLoc/${iceAgLoc}`);
  }

  public  update(agenceVoitureFormData:FormData):Observable<any>{
    return this.http.put(this.url,agenceVoitureFormData)
  }

  public getByusername(username: String):Observable<AgenceLocation> {
    return this.http.get<AgenceLocation>(`${this.url}username/${username}`);
  }


  //logo*************************************************************************
  public getImagesByIceAgLoc(username:string):Observable<any>{
    return  this.http.get<any>(`${this.url}images/${username}`);
  }

  //logo*************************************************************************


  get item(): AgenceLocation {
    return this._item;
  }

  set item(value: AgenceLocation) {
    this._item = value;
  }

  get items(): Array<AgenceLocation> {
    return this._items;
  }

  set items(value: Array<AgenceLocation>) {
    this._items = value;
  }

  creeCompte(iceAgLoc:any,username: any, password: any):Observable<any> {
    this.item.iceAgLoc=iceAgLoc;
    this.item.usernameAgenceLoc=username;
    this.item.password=password;
    console.log(this.item)
    return  this.http.post<any>("http://localhost:8085/api/agenceLocation/", this.item)
  }
}
