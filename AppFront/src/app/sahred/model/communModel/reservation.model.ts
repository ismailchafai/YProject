import {Voiture} from "../voitureModel/voiture.model";
import {Client} from "./client.model";
import {Appartement} from "../appartemetModel/appartement.model";

export class Reservation {
  ref:string;
  dateDebut:string;
  heureDebut:string;
  dateFin:string;
  heureFin:string;
  lieuPrise: string;
  lieuRetour: string;
  description:string;
  voiture:Voiture;
  client: Client;
  appartement: Appartement;

  constructor() {
    this.ref="";
    this.dateDebut="";
    this.heureDebut="";
    this.dateFin ="";
    this.heureFin="";
    this.lieuPrise= "";
    this.lieuRetour= "";
    this.description="";
    this.voiture=new Voiture();
    this.client= new Client();
    this.appartement=new Appartement();
  }
}
