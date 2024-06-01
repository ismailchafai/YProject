import { Injectable } from '@angular/core';
import { AgenceAppartement } from '../../model/appartemetModel/AgenceAppartement.model';
import {Appartement} from "../../model/appartemetModel/appartement.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../../model/communModel/client.model";

@Injectable({
  providedIn: 'root'
})
export class AgenceAppartementService {

  public _item: AgenceAppartement = new AgenceAppartement();
  public _items:Array<AgenceAppartement>=new Array<AgenceAppartement>();
  _appartemetsByCin: Array<Appartement>=new Array<Appartement>();

  private _cinPropService! :string;

  public  editPropExiste : AgenceAppartement=new AgenceAppartement();

  get cinPropService(): string {
    return this._cinPropService;
  }

  set cinPropService(value: string) {
    this._cinPropService = value;
  }

  constructor(private http: HttpClient) { }

  public save(): Observable<any> {
    return this.http.post<number>("http://localhost:8085/api/agenceAppartement/", this.item);
  }

  public getAll():Observable<Array<AgenceAppartement>>{
    return this.http.get<Array<AgenceAppartement>>("http://localhost:8085/api/agenceAppartement/");
  }

  public get(cin:string):Observable<AgenceAppartement>{
    return this.http.get<AgenceAppartement>(`http://localhost:8085/api/agenceAppartement/cin/${cin}`);
  }

  public delete(cin:number):Observable<any>{
    return this.http.delete<number>(`http://localhost:8085/api/agenceAppartement/cin/${cin}`);
  }

  public  update(agenceAppartementFormData:FormData):Observable<any>{
    console.log(agenceAppartementFormData)
    return this.http.put("http://localhost:8085/api/agenceAppartement/",agenceAppartementFormData)
  }

  public getByusername(username: String): Observable<AgenceAppartement> {
    return this.http.get<AgenceAppartement>(`http://localhost:8085/api/agenceAppartement/username/${username}`);
  }


  public getImagesByIceAgApp(username:string):Observable<any>{
    return  this.http.get<any>(`http://localhost:8085/api/agenceAppartement/images/${username}`);
  }


  creeCompte(cin:any,username: any, password: any):Observable<any> {
    this.item.iceAgApp=cin;
    this.item.username=username;
    this.item.password=password;
    console.log(this.item)
    return  this.http.post<any>("http://localhost:8085/api/agenceAppartement/", this.item)
  }

  get item(): AgenceAppartement {
    return this._item;
  }

  set item(value: AgenceAppartement) {
    this._item = value;
  }

  get items(): Array<AgenceAppartement> {
    return this._items;
  }

  set items(value: Array<AgenceAppartement>) {
    this._items = value;
  }


  get appartemetsByCin(): Array<Appartement> {
    return this._appartemetsByCin;
  }

  set appartemetsByCin(value: Array<Appartement>) {
    this._appartemetsByCin = value;
  }
}
