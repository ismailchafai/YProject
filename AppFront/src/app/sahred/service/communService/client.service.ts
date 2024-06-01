import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../../model/communModel/client.model";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private _item: Client = new Client();
  private _items: Array<Client> = new Array<Client>()
  private url = "http://localhost:8085/api/client/"

  constructor(private http: HttpClient) {
  }

  public save(): Observable<number> {
    return this.http.post<number>(this.url, this.item);
  }

  public getAll(): Observable<Array<Client>> {
    return this.http.get<Array<Client>>(this.url);
  }

  public delete(cin: String): Observable<any> {
    return this.http.delete<number>(`${this.url}cin/${cin}`);
  }

  public update(client: Client): Observable<any> {
    return this.http.put(this.url, client)
  }

  public getByusername(username: String): Observable<Client> {
    return this.http.get<Client>(`${this.url}username/${username}`);
  }
public getByCin(cin: String): Observable<Client> {
    return this.http.get<Client>(`http://localhost:8085/api/client/cin/${cin}`);
  }


  get item(): Client {
    return this._item;
  }

  set item(value: Client) {
    this._item = value;
  }

  get items(): Array<Client> {
    return this._items;
  }

  set items(value: Array<Client>) {
    this._items = value;
  }
}
