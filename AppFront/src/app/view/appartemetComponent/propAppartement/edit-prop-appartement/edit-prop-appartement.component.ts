import {Component, Input, OnInit} from '@angular/core';
import {AgenceAppartement} from "../../../../sahred/model/appartemetModel/AgenceAppartement.model";
import {AgenceAppartementService} from "../../../../sahred/service/appartemetService/agence-appartement.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-prop-appartement',
  templateUrl: './edit-prop-appartement.component.html',
  styleUrl: './edit-prop-appartement.component.css'
})
export class EditPropAppartementComponent implements OnInit{

  // public _ok: boolean = false;
  // public editPropNew  :PropAppartement=new PropAppartement();
  // // @ts-ignore
  @Input() cinEnfante: number | undefined;
  //
  //
  //
  // constructor(protected propAppartementService: PropAppartementService,private  router:Router) {
  // }
  //
  ngOnInit(): void {

  }
  //
  // onSubmit() {
  //   if ( this.editPropNew.nom === "") {
  //     this.editPropNew.nom = this.propAppartementService.editPropExiste.nom;
  //   }
  //   if (this.editPropNew.prenom.trim() === "") {
  //     this.editPropNew.prenom = this.propAppartementService.editPropExiste.prenom;
  //   }
  //   if (this.editPropNew.numTele.trim() === "") {
  //     this.editPropNew.numTele = this.propAppartementService.editPropExiste.numTele;
  //   }
  //   if (this.editPropNew.email.trim() === "") {
  //     this.editPropNew.email = this.propAppartementService.editPropExiste.email;
  //   }
  //   if (this.editPropNew.ribPropAppt.trim() === "") {
  //     this.editPropNew.ribPropAppt = this.propAppartementService.editPropExiste.ribPropAppt;
  //   }
  //   if (this.editPropNew.numCompteBkPropApp.trim() === "") {
  //     this.editPropNew.numCompteBkPropApp = this.propAppartementService.editPropExiste.numCompteBkPropApp;
  //   }
  //   if (this.editPropNew.usernamePropAppt.trim() === "") {
  //     this.editPropNew.usernamePropAppt = this.propAppartementService.editPropExiste.usernamePropAppt;
  //   }
  //
  //   this.editPropNew.cin=this.propAppartementService.cinPropService
  //   this.propAppartementService.update(this.editPropNew).subscribe({
  //     next: data => {
  //       this.get();
  //       location.reload();
  //     },
  //     error: err => {
  //       console.log("error : ", err);
  //     }
  //   });
  // }
  // get items(): Array<PropAppartement> {
  //   return this.propAppartementService._items;
  // }
  //
  // set items(value: Array<PropAppartement>) {
  //   this.propAppartementService._items = value;
  // }
  //
  // public get() {
  //   this.propAppartementService.getAll().subscribe({
  //     next: data => {
  //       this.items = data
  //     },
  //     error: err => {
  //       console.log(err)
  //     }
  //   })
  // }
  //
  // replirCin() {
  //   this.propAppartementService.cinPropService=this.cinEnfante;
  //   this.propAppartementService.get(this.cinEnfante).subscribe({
  //     next: data => {
  //       this.propAppartementService.editPropExiste = data;
  //     },
  //     error: err => {
  //       console.log(err);
  //     }
  //   });
  // }
}
