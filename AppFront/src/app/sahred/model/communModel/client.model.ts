import {AgenceLocation} from "../voitureModel/agence-location.model";
import {AgenceAppartement} from "../appartemetModel/AgenceAppartement.model";
import {Reservation} from "./reservation.model";

export class Client {
  cin: string;
  prenom: string;
  nom: string;
  numTeleClient: string;
  username_Client: string;
  password_Client: string;
  email_Client: string;
  agenceLocation: AgenceLocation;
  propAppartemenetDto: AgenceAppartement;
  reservationDto!: Array<Reservation>;

  constructor() {
    this.cin = "";
    this.prenom = "";
    this.nom = "";
    this.numTeleClient = "";
    this.username_Client = "";
    this.password_Client = "";
    this.email_Client = "";
    this.agenceLocation = new AgenceLocation()
    this.propAppartemenetDto = new AgenceAppartement()
  }
}
