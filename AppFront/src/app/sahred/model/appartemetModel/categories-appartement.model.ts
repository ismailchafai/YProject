import {FileHandle} from "../file-handle.model";

export class CategoriesAppartement {
  id:number;
  libelle:String;
  images!: FileHandle;
  constructor() {
    this.id=0
    this.libelle=""
  }

}
