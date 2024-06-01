import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contrat} from "../../model/communModel/contrat.model";

@Injectable({
  providedIn: 'root'
})
export class ContratService {


  public _item: Contrat = new Contrat();
  public _items:Array<Contrat>=new Array<Contrat>();

  constructor(private http: HttpClient) {}
  public save(): Observable<any> {
    return this.http.post<number>("http://localhost:8085/api/contrat/", this.item);
  }

  public getAll():Observable<Array<Contrat>>{
    return this.http.get<Array<Contrat>>("http://localhost:8085/api/contrat/");
  }

  public delete(numContrat:number):Observable<any>{
    return this.http.delete<number>(`http://localhost:8085/api/contrat/numContrat/${numContrat}`);
  }

  public  update(propritaire:Contrat):Observable<any>{
    return this.http.put("http://localhost:8085/api/contrat/",propritaire)

  }


  get items(): Array<Contrat> {
    return this._items;
  }

  set items(value: Array<Contrat>) {
    this._items = value;
  }

  get item(): Contrat {
    return this._item;
  }

  set item(value: Contrat) {
    this._item = value;
  }


  get(numContrat: number):Observable<Contrat> {
    return this.http.get<Contrat>(`http://localhost:8085/api/contrat/numContrat/${numContrat}`);

  }
}
