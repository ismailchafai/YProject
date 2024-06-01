import {Component, Input} from '@angular/core';
import {CategoriesAppartement} from "../../../../sahred/model/appartemetModel/categories-appartement.model";
import {
  CategoriesAppartementService
} from "../../../../sahred/service/appartemetService/categories-appartement.service";

@Component({
  selector: 'app-edit-categories-appartement',
  templateUrl: './edit-categories-appartement.component.html',
  styleUrl: './edit-categories-appartement.component.css'
})
export class EditCategoriesAppartementComponent {
  @Input() libelleEnfante!: String;
  // public editCategoriesNew  :CategoriesAppartement=new CategoriesAppartement();
  // constructor(protected categoriesService:CategoriesAppartementService) {
  // }
  // replirLibelle() {
  //   // @ts-ignore
  //   this.categoriesService.libelleCategoriesService=this.libelleEnfante;
  //
  //   this.categoriesService.get(this.libelleEnfante).subscribe({
  //     next: data => {
  //       this.categoriesService.editCategoriesExiste = data;
  //       console.log(this.categoriesService.editCategoriesExiste)
  //     },
  //     error: err => {
  //       console.log(err);
  //     }
  //   });
  //
  // }
  //
  // get items(): Array<CategoriesAppartement> {
  //   return this.categoriesService._items;
  // }
  //
  // set items(value: Array<CategoriesAppartement>) {
  //   this.categoriesService._items = value;
  // }
  //
  //
  // public  getAll(){
  //   this.categoriesService.getAll().subscribe({
  //     next:data =>{
  //       this.items=data
  //     },
  //     error:err => {
  //       console.log(err)
  //     }
  //   })
  // }
  //
  // onSubmit() {
  //   if ( this.editCategoriesNew.libelle === "") {
  //     this.editCategoriesNew.libelle = this.categoriesService.editCategoriesExiste.libelle;
  //   }
  //
  //   console.log(this.editCategoriesNew.libelle )
  //   console.log(this.categoriesService.editCategoriesExiste.libelle)
  //   let data={
  //     "libelle": this.categoriesService.editCategoriesExiste.libelle,
  //     "libelleNew": this.editCategoriesNew.libelle
  //   }
  //   console.log(data)
  //   this.categoriesService.update(data).subscribe({
  //     next: data => {
  //       this.getAll();
  //       location.reload();
  //     },
  //     error: err => {
  //       console.log("error : ", err);
  //     }
  //   });
  // }
}
