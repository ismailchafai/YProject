import {Component, OnInit} from '@angular/core';
import {AgenceAppartementService} from "../../../../sahred/service/appartemetService/agence-appartement.service";
import {AgenceAppartement} from "../../../../sahred/model/appartemetModel/AgenceAppartement.model";
import {AppartemetService} from "../../../../sahred/service/appartemetService/appartemet.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-creat-prop-appartement',
  templateUrl: './creat-prop-appartement.component.html',
  styleUrl: './creat-prop-appartement.component.css'
})
export class CreatPropAppartementComponent implements OnInit{

  public _ok:boolean=false;

  constructor(public _service :AgenceAppartementService,public  _appartementService:AppartemetService,private router:Router) {

  }

  get item(): AgenceAppartement {
    return this._service.item;
  }


  set item(value: AgenceAppartement) {
    this._service.item = value;
  }
  public save() {
    this.service.save().subscribe({

      next: (response: number) => {

        console.log(response)
        if (response === -1) {

        } else if (response === -2) {
          console.log("mohammed l3z!!")
        } else if (response === -3) {
          // Traitement pour le cas où l'enregistrement a échoué avec le code -3
        } else if (response === 1) {

          this._ok = true
          setTimeout(() => {
            this._ok = false; // Hide the notification after 5 seconds
          }, 10000);

          this.get();

        }
      },
      error: (err:any) => {
        // Gérer les erreurs
      }
    });
  }


  public  get(){
    this._service.getAll().subscribe({
      next:data=>{
        this.items=data
      },
      error:err => {
        console.log(err)
      }
    })
  }

  public  delete(cin:number){
    this._service.delete(cin).subscribe({
      next:value => {
        this.get();
      },
      error:err => {
        console.log(err)
      }
    })
  }

  public  getAppartemetsbyCin(cin:number){
    this._appartementService.getAppartemetsCin(cin).subscribe({
      next:data=>{
        // console.log(data)
        this._service._appartemetsByCin=data
        console.log(this._service._appartemetsByCin)
        this.router.navigateByUrl("/listComponent")

      },
      error:err => {
        console.log(err)
      }
    })
  }


  public  update(cin :string):any{

// this._service.cinEdit=cin
//     console.log(this._service.cinEdit)
    // this.router.navigateByUrl("editProp")
    // this._service.update(this.item).subscribe(
    //   {
    //     next :data=>{
    //       console.log("mohammed")
    //       this._ok = true
    //       setTimeout(() => {
    //         this._ok = false; // Hide the notification after 5 seconds
    //       }, 10000);
    //
    //       this.get();
    //     },error:err => {
    //       console.log(err);
    //     }
    //   }
    // )
  }


  get items(): Array<AgenceAppartement> {
    return this._service._items;
  }

  set items(value: Array<AgenceAppartement>) {
    this._service._items = value;
  }

  supprimet() {
    this.item.iceAgApp= 0;
    this.item.raisonSocialAg= "";
    this.item.numTele= "";
    this.item.email= "";
    this.item.adresse= "";
    this.item.numCompteBkAgApp= 0;
    this.item.ribAgenceApp= 0;
    this.item.RCAgApp= 0;
    this.item.username= "";
    this.item.password= "";
  }
  get service(): AgenceAppartementService {
    return this._service;
  }

  set service(value: AgenceAppartementService) {
    this._service = value;
  }

  ngOnInit(): void {
    this.get();
  }


  // editProp(cin:string) {
  //   this.router.navigateByUrl("editProp")
  // }
}
