import { Injectable } from '@angular/core';
import {CategoriesAppartement} from "../../model/appartemetModel/categories-appartement.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Appartement} from "../../model/appartemetModel/appartement.model";

@Injectable({
  providedIn: 'root'
})
export class CategoriesAppartementService {

  public _item: CategoriesAppartement = new CategoriesAppartement();
  public _items:Array<CategoriesAppartement>=new Array<CategoriesAppartement>();

  _appartemetsByCategories: Array<Appartement>=new Array<Appartement>();

  public libelleCategoriesService! :string;

  public  editCategoriesExiste : CategoriesAppartement=new CategoriesAppartement();

  constructor(private http: HttpClient) { }

  public save(fomrData:FormData): Observable<number> {
    return this.http.post<number>("http://localhost:8085/api/categoriesAppartemen/",fomrData);
  }

  public getAll():Observable<Array<CategoriesAppartement>>{
    return this.http.get<Array<CategoriesAppartement>>("http://localhost:8085/api/categoriesAppartemen/public");
  }

  public get(libelle:String):Observable<CategoriesAppartement>{
    return this.http.get<CategoriesAppartement>(`http://localhost:8085/api/categoriesAppartemen/libelle/${libelle}`);
  }
  public delete(libelle:String):Observable<any>{
    return this.http.delete<number>(`http://localhost:8085/api/categoriesAppartemen/libelle/${libelle}`);
  }

  public  update(data:any):Observable<any>{
    return this.http.put("http://localhost:8085/api/categoriesAppartemen/",data)

  }

  get item(): CategoriesAppartement {
    return this._item;
  }

  set item(value: CategoriesAppartement) {
    this._item = value;
  }

  get items(): Array<CategoriesAppartement> {
    return this._items;
  }

  set items(value: Array<CategoriesAppartement>) {
    this._items = value;
  }


  get appartemetsByCategories(): Array<Appartement> {
    return this._appartemetsByCategories;
  }

  set appartemetsByCategories(value: Array<Appartement>) {
    this._appartemetsByCategories = value;
  }

}
