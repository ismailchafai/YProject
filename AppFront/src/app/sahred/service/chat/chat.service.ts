import { Injectable } from '@angular/core';
import {Notifiaction} from "../../model/notificationModel/notifiaction.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Chat} from "../../model/chat/chat";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _item:Chat=new Chat();
  private _items:Array<Chat>=new Array<Chat>();
  private url="http://localhost:8085/api/chat/";
  constructor(private http:HttpClient) { }

  public save(): Observable<number> {
    return this.http.post<number>(this.url,this.item);
  }

  public getAllBySender(sender:string):Observable<Array<Chat>>{
    return this.http.get<Array<Chat>>(`${this.url}sender/${sender}`);
  }

  getALlByRecipient(recipient: string):Observable<Array<Chat>> {
    return this.http.get<Array<Chat>>(`${this.url}/recipient/${recipient}`);
  }
  getAllBySenderAndRecipient(sender:string,recipient: string):Observable<Array<Chat>> {
    return this.http.get<Array<Chat>>(`${this.url}/senedr/${sender}/recipient/${recipient}`);
  }
  getALl():Observable<Array<Chat>> {
    return this.http.get<Array<Chat>>(this.url);
  }

  get item(): Chat {
    return this._item;
  }

  set item(value: Chat) {
    this._item = value;
  }

  get items(): Array<Chat> {
    return this._items;
  }

  set items(value: Array<Chat>) {
    this._items = value;
  }

}
