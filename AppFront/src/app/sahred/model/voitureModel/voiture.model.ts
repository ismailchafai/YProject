import {CategorieVoiture} from "./categorie-voiture.model";
import {AgenceLocation} from "./agence-location.model";
import {FileHandle} from "../file-handle.model";

export class Voiture {
  couleur:string;
  nbrPlace:string;
  matricule:string;
  kiloMetrage:string;
  boitevitesse:string;
  annee:number;
  ville:string;
  dateMisecirculation:Date;
  dateAssurance:Date;
  sateVisitetechnique:Date;
  nomModele:string;
  images: FileHandle[];
  categorie:CategorieVoiture=new CategorieVoiture();
  agenceLocation!:AgenceLocation;
  prix!:number;
  puissance:number;
  Carburant:string;

  constructor(){
    this.couleur = "";
    this.nbrPlace = "";
    this.matricule = "";
    this.kiloMetrage = "";
    this.boitevitesse = "";
    this.annee = 0;
    this.ville = "";
    this.images=[];
    this.dateMisecirculation = new Date();
    this.dateAssurance = new Date();
    this.sateVisitetechnique = new Date();
    this.nomModele="";
    this.puissance=0;
    this.Carburant="";

  }
}
