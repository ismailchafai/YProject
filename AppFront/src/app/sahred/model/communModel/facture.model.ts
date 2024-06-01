import {Paiement} from "./paiementDto.model";
import {Location} from "./location.model";

export class Facture {
  ref: string;
  dateFacture: Date;
  montantTotal: number;
  location: Location;
  paiementDto:Paiement;
  constructor() {
    this.ref = "";
    this.dateFacture = new Date();
    this.montantTotal = 0;
    this.location = new Location();
    this.paiementDto =new Paiement();
  }


}
