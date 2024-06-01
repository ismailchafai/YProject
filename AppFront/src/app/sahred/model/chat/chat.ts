export class Chat {

   sender:string;//username
   recipient:string;
   content:string;
   content2:string;
   date:Date;


  constructor() {

    this.sender = "";
    this.recipient = "";
    this.content = "";
    this.content2 = "";
    this.date = new Date();
  }
}
