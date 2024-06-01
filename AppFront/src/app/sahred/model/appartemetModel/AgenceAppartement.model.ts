import {FileHandle} from "../file-handle.model";
import {File} from "node:buffer";
import {SafeUrl} from "@angular/platform-browser";

export class AgenceAppartement {
  iceAgApp: number;
  raisonSocialAg: string;
  numTele: string;
  email: string;
  adresse: string;
  numCompteBkAgApp: number;
  ribAgenceApp: number;
  RCAgApp: number;
  username: string;
  password: string;
  images!: FileHandle;
  constructor() {
    this.iceAgApp = 0;
    this.raisonSocialAg = "";
    this.numTele = "";
    this.email = "";
    this.adresse = "";
    this.numCompteBkAgApp = 0;
    this.ribAgenceApp = 0;
    this.RCAgApp = 0;
    this.username = "";
    this.password = "";
    }
  }

