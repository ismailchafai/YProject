import {Component, OnInit} from '@angular/core';
import {AuthService} from "../security/serviceAuth/auth.service";
import {NotifiactionService} from "../sahred/service/notificationService/notifiaction.service";
import {AgenceLocation} from "../sahred/model/voitureModel/agence-location.model";
import {Notifiaction} from "../sahred/model/notificationModel/notifiaction.model";
import {ClientService} from "../sahred/service/communService/client.service";
import {Client} from "../sahred/model/communModel/client.model";
import {AppartemetService} from "../sahred/service/appartemetService/appartemet.service";
import {VoitureService} from "../sahred/service/voitureService/voiture.service";
import {Voiture} from "../sahred/model/voitureModel/voiture.model";
import {Appartement} from "../sahred/model/appartemetModel/appartement.model";
import {ReservationService} from "../sahred/service/communService/reservation.service";
import {Reservation} from "../sahred/model/communModel/reservation.model";
import {LocationService} from "../sahred/service/communService/location.service";
import {Location} from "../sahred/model/communModel/location.model";
import {RandomUUIDOptions} from "node:crypto";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {VideNotificationComponent} from "../layout/vide-notification/vide-notification.component";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {Facture} from "../sahred/model/communModel/facture.model";
import {FactureService} from "../sahred/service/communService/facture.service";

@Component({
  selector: 'app-notification-info',
  templateUrl: './notification-info.component.html',
  styleUrl: './notification-info.component.css'
})
export class NotificationInfoComponent implements OnInit{
  dataByIceAgence:any;
  locationData:Location=new Location();
  dataAgence:Notifiaction=new Notifiaction();
  notificationClient: Array<Notifiaction>=new Array<Notifiaction>();
  notifiactionSelectionner:Notifiaction=new Notifiaction();
  dataClientByCin:Client=new Client();
  dataVoitureByMatricue:Voiture=new Voiture();
  dataApparetementByCode:Appartement=new Appartement();
  numberJoures!: number;
  ref!: string;

  dataReservationByRef: Reservation=new Reservation();
  reseirvationBollean=true;
  private ice: any;
  private isCreate: boolean = false;
  private messageService!: MessageService;
  private currentDate!: Date;
  displaysucces: boolean = false;
  displaysuccesDelete: boolean = false;

  constructor(protected authService:AuthService , private notifiactionService:NotifiactionService,
              private clientService:ClientService , private appartemetService:AppartemetService,
              private voitureService:VoitureService ,private reservationService:ReservationService,
              private locationService:LocationService ,public dialog: MatDialog,public router:Router) {}

  ngOnInit(): void {
    this.getAllByCinClient();
    console.log("rwfwef")
    console.log(this.notificationClient)
    console.log(this.authService.roles)
    this.getALlByIceAgence()


  }



  public display:boolean = false;
  showDialog(data:Notifiaction) {
    this.display=true
    this.ref=data.refReservation;
    this.dataAgence=data;
    data.isvisible=true
    this.updateNotification(data);
    // this.getALlByIceAgence();
  }

  getALlByIceAgence(){
    if(this.authService.roles.includes("MANAGER-VOI")){this.ice=this.authService.dataUtilisateur.iceAgLoc}
    if(this.authService.roles.includes("MANAGER-APT")){this.ice=this.authService.dataUtilisateur.iceAgApp}
    this.notifiactionService.getALlByIceAgence(this.ice).subscribe({
      next:data=>{
        console.log(this.ice)
        this.dataByIceAgence=data;
        console.log("dataByIceAgence")
        console.log(data)
      },
      error:err=>{console.log(err)}
    })
  }
  getAllByCinClient(){
    this.notifiactionService.getALlByCinClient(this.authService.dataUtilisateur.cin).subscribe({
          next:(data)=>{
            this.notificationClient=data;
            console.log("data de cleint abdelilahd")
            console.log(data);
          }
        }
    )
  }


  getClientByCin(cin:string){
    this.clientService.getByCin(cin).subscribe({
      next:data=>{
        this.dataClientByCin=data;
        console.log(this.dataClientByCin)
      },
      error:err=>{console.log(err)}
    })
  }
  findVoitureByMatricule(matricule:string){
    this.voitureService.get(matricule).subscribe({
      next:data=>{
        this.dataVoitureByMatricue=data;
      },
      error:err => {console.log(err)}
    })
  }

  findApparetementByCode(code:string){
    this.appartemetService.get(code).subscribe({
      next:data=>{
        this.dataApparetementByCode=data;
      },
      error:err => {console.log(err)}
    })
  }




  calculerNombreJours(dateDebut: string, dateFin: string) {
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const difference = fin.getTime() - debut.getTime();
    // Convertir la différence en jours (en divisant par le nombre de millisecondes dans une journée)
    const jours = difference / (1000 * 60 * 60 * 24);
    // Arrondir le résultat à l'entier le plus proche et le renvoyer
    this.numberJoures= Math.round(jours);
    console.log(this.numberJoures)
  }

  deleteReservationByRef(){
    this.reservationService.delete(this.ref).subscribe({
      next:data=>{
        if(data>0){
          this.display=false
          setTimeout(() => {

            this.displaysuccesDelete = false;
          }, 3000);
          this.displaysuccesDelete = true;
          // this.display=false;
          console.log("sucss delete")
        }
        if(data==0){
          console.log("dejasupperemet")
        }
        this.findReservationByRef()
      },
      error:err => {console.log(err)}
    })
  }


  findReservationByRef(){
    this.reservationService.getByRef(this.ref).subscribe({
      next:data=>{
        if(data==null){
          this.reseirvationBollean=false;
        }
        else{
          this.reseirvationBollean=true;
          this.dataReservationByRef=data;
        }
      },
      error:err => {console.log(err)}
    })
  }


  saveLocation(){
    this.locationService.save().subscribe({
      next:data=>{
        if(data==1){
          this.dataAgence.confermer=true ;
          this.updateNotification(this.dataAgence);
          this.display=false
          setTimeout(() => {

            this.displaysucces = false;
          }, 3000);
          this.displaysucces = true;
          console.log("location save avec secces")
        }
        else{
          console.log("location n'est pas save")
          console.log(data)
        }
      },
      error:err=>{console.log(err)}
    })
  }
  // get items(): Array<Location> {
  //   return this.locationService._items;
  // }
  //
  // set items(value: Array<Location>) {
  //   this.locationService._items = value;
  // }

  get item(): Location {
    return this.locationService._item;
  }

  set item(value: Location) {
    this.locationService._item = value;
  }

  generateRandomCode(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  handeleSaveLocation(){
    this.item.ref=this.generateRandomCode(10);
    this.item.dateDebut=this.dataAgence.dateDebutReservation;
    this.item.datefine=this.dataAgence.dateFinReservation;
    this.item.reservationDto=this.dataReservationByRef;
    this.saveLocation();

    // this.fitem.ref = this.generateRandomCode(10);
    // this.fitem.location.ref=this.item.ref ;
    // this.fitem.dateFacture=this.currentDate;
    // this.fitem.montantTotal=this.dataReservationByRef.
    // this.saveFactur();

  }
  updateNotification(data:Notifiaction){
    this.notifiactionService.update(data).subscribe({
      next:data=>{
        if(data==1){
          console.log("data is update")
        }else{
          console.log(data +" ::probleme")
        }
      },
      error:err=>{console.log(err)}
    })
  }
  findLocationByReservationRef(ref:string){
    this.locationService.findLocationByReservationRef(ref).subscribe({
      next:(data)=>{
        this.locationData=data;
      }
    })
  }




  showDialoge(item: Notifiaction) {
    this.display=true;
    this.ref=item.refReservation;
    this.locationService.refLocation=item.refReservation;
    item.visibleClinet=true;
    this.notifiactionService.update(item).subscribe({
      next:(data)=>{
        console.log(data);
      }
    });

    this.notifiactionSelectionner=item;
  }

  handelAnnuler(notification:Notifiaction) {

    this.findLocationByReservationRef(notification.refReservation);
    this.locationService.delete(this.locationData.ref).subscribe({
      next:(data)=>{
        if(data==1) {
          this.display = false;
        }
      }
    })
    this.deleteReservationByRef();

  }

  // showCreate() {
  //   if(this.isCreate){
  //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account successfully created' });
  //   }
  //
  // }
  // aficheMessage() {
  //   this.isCreate==true;
  //   this.showCreate();
  // }


  redirectVersfacture() {
    // this.router.navigateByUrl('/facture');
    this.display=false;
    this.isAffaiche=false;
  }
  //
  // saveFactur(){
  //   this.factureService.save().subscribe({
  //     next:data=>{
  //       if(data==1){
  //         alert("Facteur save avec secces")
  //       }
  //     },
  //     error:err=>{console.log(err)}
  //   })
  // }
  // get isAffaiche(): boolean {
  //   return this.notifiactionService.isAffaiche;
  // // }

  set isAffaiche(value: boolean) {
    this.notifiactionService.isAffaiche = value;
  }




  // get fitems(): Array<Facture> {
  //   return this.factureService.items;
  // }
  //
  // set fitems(value: Array<Facture>) {
  //   this.factureService.items = value;
  // }

  // get fitem(): Facture {
  //   return this.factureService.item;
  // }

  // set fitem(value: Facture) {
  //   this.factureService.item = value;
  // }

  // HandelRejet(){
  //   this.deleteReservationByRef();
  //   this.dataAgence.annuler=true;
  //   this.notifiactionService.update(this.dataAgence).subscribe({
  //     next:(data)=>{
  //       console.log("updaate message annulation "+data);
  //     }
  //   })
  // }
  //
  //
  // handelConferme(){
  //   this.handeleSaveLocation();
  //   this.dataAgence.confermer=true;
  //   this.notifiactionService.update(this.dataAgence).subscribe({
  //     next:(data)=>{
  //       console.log("update message de confermation "+ data);
  //     }
  //   })
  // }

  returnUrl(item: any):string {
    return  item.imagePaths[0]
  }
}
