import {AgenceLocation} from "../voitureModel/agence-location.model";
import {AgenceAppartement} from "../appartemetModel/AgenceAppartement.model";
import {Facture} from "./facture.model";

export class Paiement {
  ref: string;
  datePaiement: Date;
  ribClient: number;

  agenceLocationDto: AgenceLocation;

  propAppartemenetDto: AgenceAppartement;

  factureDto: Facture;


  constructor() {
    this.ref = "";
    this.datePaiement = new Date();
    this.ribClient = 0;
    this.agenceLocationDto =new AgenceLocation()
    this.propAppartemenetDto =new AgenceAppartement()

    this.factureDto = new Facture();
  }

}

