import {Location} from "./location.model";
export class Contrat {
  numContrat:number;
  prixHT:number;
  tva:number;
  modelePaiement:string;
  dureeRetard:number;
  dateSignature:string;
  rest:number;
  location:Location;

  constructor() {
    this.numContrat = 0;
    this.prixHT = 0;
    this.tva = 0;
    this.modelePaiement = "";
    this.dureeRetard = 0;
    this.dateSignature = "";
    this.rest = 0;
    this.location =new Location();
  }
}
