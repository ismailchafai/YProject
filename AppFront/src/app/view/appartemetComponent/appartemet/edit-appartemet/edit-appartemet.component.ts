import {Component, Input, OnInit} from '@angular/core';
import {AppartemetService} from "../../../../sahred/service/appartemetService/appartemet.service";
import {
  CategoriesAppartementService
} from "../../../../sahred/service/appartemetService/categories-appartement.service";
import {AgenceAppartementService} from "../../../../sahred/service/appartemetService/agence-appartement.service";
import {AgenceAppartement} from "../../../../sahred/model/appartemetModel/AgenceAppartement.model";
import {CategoriesAppartement} from "../../../../sahred/model/appartemetModel/categories-appartement.model";
import {Appartement} from "../../../../sahred/model/appartemetModel/appartement.model";

@Component({
  selector: 'app-edit-appartemet',
  templateUrl: './edit-appartemet.component.html',
  styleUrl: './edit-appartemet.component.css'
})
export class EditAppartemetComponent implements OnInit{

  // constructor(protected appartemetService:AppartemetService, public categorieService:CategoriesAppartementService, public  propAppartement:PropAppartementService) {
  // }
  @Input() codeEnfante!: string;
  //
  // public  propString : string[]=[]
  // public  selectedProp :string=""
  // public  propAppartements! :Array<PropAppartement>
  //
  // public  categoriesString: string[]=[]
  // public selectedCategory: string="";
  // public  categorits : CategoriesAppartement[]=[]
  //
  // public editAppartmentNew  :Appartement=new Appartement();
  //
  //
  // replirCin() {
  //   // this.getCategoriesLibelle();
  //   // this.getPropCin();
  //
  //   this.appartemetService.codeAppartemetService=this.codeEnfante;
  //   console.log(this.appartemetService.codeAppartemetService)
  //   this.appartemetService.get(this.codeEnfante).subscribe({
  //     next: data => {
  //       console.log(data)
  //       this.appartemetService.editAppartemetExiste = data;
  //       console.log(this.appartemetService.editAppartemetExiste)
  //     },
  //     error: err => {
  //       console.log(err);
  //     }
  //   });
  //
  //
  // }
  //
  //
  //
  //
  // onSubmit() {
  //   if ( this.editAppartmentNew.adresse === "") {
  //     console.log("mohammed 1")
  //     this.editAppartmentNew.adresse = this.appartemetService.editAppartemetExiste.adresse;
  //   }
  //   if (this.editAppartmentNew.superficie === 0) {
  //     console.log("mohammed 2")
  //     this.editAppartmentNew.superficie = this.appartemetService.editAppartemetExiste.superficie;
  //   }
  //
  //   if (this.editAppartmentNew.loyerMensuel === 0) {
  //     console.log("mohammed 3")
  //     this.editAppartmentNew.loyerMensuel = this.appartemetService.editAppartemetExiste.loyerMensuel;
  //   }
  //
  //
  //   if (this.selectedProp) {
  //     console.log("mohammed 3")
  //     this.editAppartmentNew.propAppartemenetDto.cin = this.appartemetService.editAppartemetExiste.propAppartemenetDto.cin;
  //   }
  //   else {
  //     console.log("mohammed 4")
  //     this.editAppartmentNew.propAppartemenetDto.cin=this.selectedProp
  //   }
  //
  //   if (this.selectedCategory) {
  //     console.log("mohammed 5")
  //     this.editAppartmentNew.categoriesAppartementDto.libelle = this.appartemetService.editAppartemetExiste.categoriesAppartementDto.libelle;
  //   }
  //   else {
  //     console.log("mohammed 6")
  //     this.editAppartmentNew.categoriesAppartementDto.libelle=this.selectedCategory
  //   }
  //   this.editAppartmentNew.code=this.appartemetService.codeAppartemetService
  //
  //   this.appartemetService.update(this.editAppartmentNew).subscribe({
  //     next: data => {
  //       this.getAll();
  //       console.log("mohammed succesfull!!")
  //     },
  //     error: err => {
  //       console.log("error : ", err);
  //     }
  //   });
  // }
  //
  //
  //
  // get items(): Array<Appartement> {
  //   return this.appartemetService._items;
  // }
  //
  // set items(value: Array<Appartement>) {
  //   this.appartemetService.items = value;
  // }
  //
  //
  // // public  getCategoriesLibelle(){
  // //   this.categorieService.getAll().subscribe(
  // //     {
  // //       next:data=>{
  // //         this.categorits=data
  // //         this.categorits.map(c=>{
  // //           this.categoriesString.push(c.libelle.toString())
  // //         })
  // //       }
  // //     }
  // //   )
  // // }
  // //
  // // public  getPropCin(){
  // //   this.propAppartement.getAll().subscribe(
  // //     {
  // //       next:data=>{
  // //         this.propAppartements=data
  // //         this.propAppartements.map(c=>{
  // //           this.propString.push(c.cin.toString())
  // //         })
  // //       }
  // //     }
  // //   )
  // // }
  //
  // public  getAll(){
  //   this.appartemetService.getAll().subscribe({
  //     next:data=>{
  //       this.items=data
  //     },
  //     error:err => {
  //       console.log(err)
  //     }
  //   })
  // }
  //
  ngOnInit(): void {
  }

}
