import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../security/serviceAuth/auth.service";
import {ClientService} from "../../../sahred/service/communService/client.service";
import {AgenceLocationService} from "../../../sahred/service/voitureService/agence-location.service";
import {AgenceAppartementService} from "../../../sahred/service/appartemetService/agence-appartement.service";
import {Client} from "../../../sahred/model/communModel/client.model";
import {AgenceLocation} from "../../../sahred/model/voitureModel/agence-location.model";
import {AgenceAppartement} from "../../../sahred/model/appartemetModel/AgenceAppartement.model";

@Component({
  selector: 'app-prodile-ezz',
  templateUrl: './prodile-ezz.component.html',
  styleUrl: './prodile-ezz.component.css'
})
export class ProdileEzzComponent implements OnInit{

  // Variable
  client:Client=new Client();
  agence:AgenceLocation=new AgenceLocation();
  propre:AgenceAppartement=new AgenceAppartement();

  constructor(protected authService:AuthService, private clientService: ClientService, private agenceLocationService: AgenceLocationService, private propAppartementService: AgenceAppartementService) {}
  ngOnInit(): void {
    this.premierLettre()
    this.fonctionP()
    console.log(this.authService.roles)
    if(this.authService.roles.includes("MANAGER-APT")){
      this.getPropre()
    }
    else if(this.authService.roles.includes("MANAGER-VOI")){
      this.getAgence()
    }
    else if(this.authService.roles.includes("USER")){
      this.getClient()
    }
  }

  getClient(){
    this.clientService.getByusername(this.authService.username).subscribe({
      next:data=>{
        console.log("data de getByUserName..."+data)
        this.client=data;
console.log("data client :::::")
        console.log(this.client)
      },
      error:err => {
        console.log("error"+err)
      }
    }
    )
  }

  getAgence(){
    this.agenceLocationService.getByusername(this.authService.username).subscribe({
      next:data=>{
        console.log("data de getByUserName..."+data)
        this.agence=data;

        console.log(this.agence)
        console.log(data)
      },
      error:err => {
        console.log("error"+err)
      }
    }
    )
  }

  getPropre(){
    this.propAppartementService.getByusername(this.authService.username).subscribe({
      next:data=>{
        console.log("data de getByUserName..."+data)
        this.propre=data;

        console.log(this.propre)
        console.log(data)
      },
      error:err => {
        console.log("error"+err)
      }
    }
    )
  }


  // getClientByCin(){
  //   this.clientService.getByCin(this.authService.dataUtilisateur.cin).subscribe({
  //       next:data=>{
  //         console.log("data de getByUserName..."+data)
  //         this.client=data;
  //
  //         console.log(this.client)
  //       },
  //       error:err => {
  //         console.log("error"+err)
  //       }
  //     }
  //   )
  // }

  lettere !:string ;
  premierLettre(){
    this.lettere = this.authService.username[0];
    console.log(this.lettere)
  }
  pElement: HTMLElement | null = document.querySelector('p');
  fonctionP(){
    if (window.getSelection) {
      const selection: Selection | null = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
      }
    }
  }
}
