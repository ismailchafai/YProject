import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../security/serviceAuth/auth.service";
import {NgIf} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {ClientService} from "../../../sahred/service/communService/client.service";
import {AgenceLocationService} from "../../../sahred/service/voitureService/agence-location.service";
import {AgenceAppartementService} from "../../../sahred/service/appartemetService/agence-appartement.service";
import {FormsModule} from "@angular/forms";
import {AgenceLocation} from "../../../sahred/model/voitureModel/agence-location.model";
import {AgenceAppartement} from "../../../sahred/model/appartemetModel/AgenceAppartement.model";
import {Client} from "../../../sahred/model/communModel/client.model";
import {Router, RouterLink} from "@angular/router";
import {FileHandle} from "../../../sahred/model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";
import {Appartement} from "../../../sahred/model/appartemetModel/appartement.model";
import {TranslateModule} from "@ngx-translate/core";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    NgIf,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatDivider,
    FormsModule,
    RouterLink,
    TranslateModule,
    TranslateModule
  ],
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  protected userRole: any

  agence = new AgenceLocation();
  prop:any;
  client = new Client();
  isExisteLogo: boolean=false;
  constructor(private sanitizer:DomSanitizer, protected authService: AuthService, private clientService: ClientService, private agenceLocationService: AgenceLocationService, protected propAppartementService:  AgenceAppartementService , private router:Router) {
  }

  ngOnInit(): void {
    console.log(this.authService.roles)
    if(this.authService.roles.includes("MANAGER-VOI")){
      this.getAgence();
    }
    else  if(this.authService.roles.includes("MANAGER-APT")){
      this.getPropre();
    }
    else if(this.authService.roles.includes("USER")){
      this.getClient();
    }
  }
  getClient(){
    this.clientService.getByusername(this.authService.username).subscribe({
        next:data=>{
          console.log("data de getByUserName..."+data)
          this.client=data;

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
          this.prop=data;

          console.log(this.prop)
          console.log(data)
        },
        error:err => {
          console.log("error"+err)
        }
      }
    )
  }
  updateClient(): void {
    console.log(this.client);
    this.client.cin = this.authService.dataUtilisateur.cin
    this.client.propAppartemenetDto = new AgenceAppartement()
    this.client.agenceLocation= new AgenceLocation();
    this.clientService.update(this.client).subscribe({
      next: (data) => {
        if (data === 1) {
          alert("mise à jour est effectuee avec succes ");
          this.router.navigateByUrl("/profile")
        } else
          console.log(data);
      },
      error:err=>{
        console.log(err)
      }
    });
  }

  /*************************************outile photo de logo appartemet************************************************/
  updateProp(): void {
    this.prop.iceAgApp=this.authService.dataUtilisateur.iceAgApp
    this.prop.username=this.authService.dataUtilisateur.username
    const preparData=this.prepareFormData(this.prop)
    this.propAppartementService.update(preparData).subscribe({
      next: (data) => {
        if (data === 1) {
          alert("le mise à jour effectue avec succes ")
          this.router.navigateByUrl("/profile")
        } else
          console.log(data);
      },
      error:err => {
        console.log(err)
      }
    });

  }

  oneFileSelected($event: Event) {
    // @ts-ignore
    if($event.target.files){
      // @ts-ignore
      const  file=$event.target.files[0];
      const fileHandle:FileHandle={
        file:file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
       console.log("Teste::2024")
       console.log(fileHandle)
       this.prop.images=fileHandle
       this.isExisteLogo=true
    }
  }


  prepareFormData(agenceAppartement:AgenceAppartement):FormData{
    const  formData=new FormData();
    formData.append(
      'agenceAppartemet'
      , new Blob(
        [JSON.stringify(agenceAppartement)],
        {type:'application/json'}
      ));

      formData.append(
        'logo',
        agenceAppartement.images.file,
        agenceAppartement.images.file.name
      );
    return formData;
  }
  /*************************************outile photo de logo voiture************************************************/
  oneFileSelectedAgenceVoiture($event: Event) {
    // @ts-ignore
    if($event.target.files){
      // @ts-ignore
      const  file=$event.target.files[0];
      const fileHandle:FileHandle={
        file:file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.agence.images=fileHandle
      this.isExisteLogo=true
    }
  }

  prepareFormDataAgence(agenceLocation:AgenceLocation):FormData{

    const  formData=new FormData();
    formData.append(
      'agenceLocation'
      , new Blob(
        [JSON.stringify(agenceLocation)],
        {type:'application/json'}
      ));

      formData.append(
        'logo',
        agenceLocation.images.file,
        agenceLocation.images.file.name
      );

    return formData;
  }

  updateAgence(): void {
    this.agence.usernameAgenceLoc=this.authService.username;
    const preparData=this.prepareFormDataAgence(this.agence)
    console.log(preparData)
    this.agenceLocationService.update(preparData).subscribe({
      next: (data) => {
        if (data === 1) {
          console.log("1")
          this.router.navigateByUrl(`/profile`)
        } else
          console.log(data);
      },
      error:err=>{
        console.log(err)
      }
    });
  }

  //*******************************************************************************************
}




