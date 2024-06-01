import { Component } from '@angular/core';
import {AuthService} from "../../security/serviceAuth/auth.service";
import {ChatService} from "../../sahred/service/chat/chat.service";
import {Chat} from "../../sahred/model/chat/chat";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  dataChat: Array<Chat>=new Array<Chat>();
  constructor(private authService:AuthService , private chatService:ChatService) {}
getAllBysender(recipient:string){
    this.chatService.getALlByRecipient(recipient).subscribe({
      next:data=>{
        this.dataChat=data;
      },
      error:err => {
        console.log(err)
      }
    })
}
getAllsender(sender:string){
    this.chatService.getAllBySender(sender).subscribe({
      next:data=>{
        this.dataChat=data;
      },
      error:err => {
        console.log(err)
      }
    })
}

getAll(){
    this.chatService.getALl().subscribe({
      next:data=>{
        this.dataChat=data;
      },
      error:err => {
        console.log(err)
      }
    })
}


}
