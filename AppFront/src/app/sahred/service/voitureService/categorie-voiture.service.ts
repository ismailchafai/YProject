import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategorieVoiture} from "../../model/voitureModel/categorie-voiture.model";
import {Observable} from "rxjs";
import {Appartement} from "../../model/appartemetModel/appartement.model";

@Injectable({
  providedIn: 'root'
})
export class CategorieVoitureService {

  private _item:CategorieVoiture=new CategorieVoiture();
  private _items:Array<CategorieVoiture>=new Array<CategorieVoiture>()
  private url="http://localhost:8085/api/safarent/manager/categorieVoiture/"
  constructor(private http:HttpClient) { }

  public save(formData:FormData): Observable<number> {
    return this.http.post<number>(this.url, formData);
  }

  public getAll():Observable<Array<CategorieVoiture>>{
    return this.http.get<Array<CategorieVoiture>>("http://localhost:8085/api/safarent/manager/categorieVoiture/public");
  }

  public delete(libelle:String):Observable<any>{
    return this.http.delete<number>(`${this.url}libelle/${libelle}`);
  }

  public  update(data:any):Observable<any>{
    return this.http.put(this.url,data)
  }

  get item(): CategorieVoiture {
    return this._item;
  }

  set item(value: CategorieVoiture) {
    this._item = value;
  }

  get items(): Array<CategorieVoiture> {
    return this._items;
  }
  set items(value: Array<CategorieVoiture>) {
    this._items = value;
  }
}
