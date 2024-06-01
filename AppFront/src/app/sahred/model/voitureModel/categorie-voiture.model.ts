import {FileHandle} from "../file-handle.model";

export class CategorieVoiture {

  public libelle:string;
  images!: FileHandle;

  constructor() {
    this.libelle = "";
  }
}
