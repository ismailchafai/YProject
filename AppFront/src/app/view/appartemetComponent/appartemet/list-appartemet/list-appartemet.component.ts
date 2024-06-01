import { Component } from '@angular/core';
import {Appartement} from "../../../../sahred/model/appartemetModel/appartement.model";
import {
  CategoriesAppartementService
} from "../../../../sahred/service/appartemetService/categories-appartement.service";
import {AgenceAppartementService} from "../../../../sahred/service/appartemetService/agence-appartement.service";

@Component({
  selector: 'app-list-appartemet',
  templateUrl: './list-appartemet.component.html',
  styleUrl: './list-appartemet.component.css'
})
export class ListAppartemetComponent {
  constructor(private categoriesSrervice:CategoriesAppartementService,private proprtaire:AgenceAppartementService) {
  }

  get appartemetsByCategories(): Array<Appartement> {
    return this.categoriesSrervice.appartemetsByCategories;
  }


  set appartemetsByCategories(value: Array<Appartement>) {
    this.categoriesSrervice.appartemetsByCategories = value;
  }

  get appartemetsByCin(): Array<Appartement> {
    return this.proprtaire.appartemetsByCin;
  }

  set appartemetsByCin(value: Array<Appartement>) {
    this.proprtaire.appartemetsByCin = value;
  }


}
