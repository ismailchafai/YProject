import {Reservation} from "./reservation.model";

export class Location {

  ref:string;
  dateDebut: string;
  datefine: string;
  reservationDto:Reservation;

  constructor() {
    this.ref = "";
    this.dateDebut="";
    this.datefine="";
    this.reservationDto = new Reservation();
  }
}
