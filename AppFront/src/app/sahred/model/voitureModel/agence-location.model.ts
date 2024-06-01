import {Paiement} from "../communModel/paiementDto.model";
import {Client} from "../communModel/client.model";
import {Voiture} from "./voiture.model";
import {FileHandle} from "../file-handle.model";

export class AgenceLocation {
  iceAgLoc: number;
  raisonSocialAg: string;
  adresse: string;
  numTelephone: string;
  numCompteBkAgLoc: number;
  ribAgenceLoc: number;
  usernameAgenceLoc: string;
  password: string;
  RCAgLoc: number;
  images!: FileHandle;
  constructor() {
    this.iceAgLoc = 0;
    this.raisonSocialAg = "";
    this.adresse = "";
    this.numTelephone = "";
    this.numCompteBkAgLoc = 0;
    this.usernameAgenceLoc = "";
    this.password = "";
    this.RCAgLoc = 0;
    this.ribAgenceLoc = 0;
  }
}
