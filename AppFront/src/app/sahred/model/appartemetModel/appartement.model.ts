
import {CategoriesAppartement} from "./categories-appartement.model";
import {Reservation} from "../communModel/reservation.model";
import {AgenceAppartement} from "./AgenceAppartement.model";
import {FileHandle} from "../file-handle.model";
export class Appartement {
  id:number;
  code: string;
  superficie: number;
  adresse: string;
  loyerMensuel: number;
  ville: string;
  wifi: string;
  nmbrPersont: number;
  climatiseur: string;
  images: FileHandle[];
  categoriesAppartementDto: CategoriesAppartement;
  propAppartemenetDto: AgenceAppartement;
  constructor() {
    this.id=0;
    this.code = "";
    this.superficie = 0;
    this.adresse = "";
    this.loyerMensuel = 0;
    this.ville="";
    this.wifi="";
    this.nmbrPersont=0;
    this.climatiseur="";
    this.images=[]
    this.categoriesAppartementDto = new CategoriesAppartement(),
    this.propAppartemenetDto= new AgenceAppartement();
  }
}
