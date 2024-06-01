import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {AuthService} from "../../security/serviceAuth/auth.service";
import {Client} from "../../sahred/model/communModel/client.model";
import {ClientService} from "../../sahred/service/communService/client.service";
import {VoitureService} from "../../sahred/service/voitureService/voiture.service";
import {Voiture} from "../../sahred/model/voitureModel/voiture.model";
import {ReservationService} from "../../sahred/service/communService/reservation.service";
import {Reservation} from "../../sahred/model/communModel/reservation.model";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {DatePipe} from "@angular/common";
import {NotifiactionService} from "../../sahred/service/notificationService/notifiaction.service";
import {Notifiaction} from "../../sahred/model/notificationModel/notifiaction.model";
import {ActivatedRoute, Router} from "@angular/router";
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-reservation-information',
  templateUrl: './reservation-information.component.html',
  styleUrl: './reservation-information.component.css',


})
export class ReservationInformationComponent  implements OnInit{
  minDate: Date;
  maxDate: Date;
  lastClicked: HTMLElement | null = null;
  public dataLoaded!:Client;
  matricule:any;
  voitureData=new Voiture();
  nbrJours=1;
  display=false;
  display2 = false;
  // findReservation
  dataReservationVoiture:Array<Reservation>=new Array<Reservation>();
  // dataReservationAppartement:Array<Reservation>=new Array<Reservation>();
  maDate = new Date();
  maDate2 = new Date();
  tableauDate:any;
  days: string[] = [];
  displaysucces: boolean = false;


  constructor(private elementRef: ElementRef , private authService:AuthService , private router:Router, private clientService :ClientService
    , private voitureService:VoitureService,private datePipe: DatePipe,private reservationService:ReservationService , private route: ActivatedRoute
    ,private clienService:ClientService , private notifiactionService :NotifiactionService,public dialog: MatDialog) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
    const defaultActiveElement = this.elementRef.nativeElement.querySelector('.nav-item.active');
    this.toggleHoverEffect(defaultActiveElement);
    this.getDataByUsername();
    this.route.params.subscribe(params => {
      this.matricule = params['matricule'];
      console.log(this.matricule);

    });
    this.getVoitureByMatricule();
    this.getReseravtionbyMatricule()
  }
  public voitureDataImages:any;

  returnUrl(voiture:any):string{
    console.log("verifier data:::")
    console.log(this.voitureDataImages)
    return voiture.imagePaths[0]
  }

  getVoitureByMatricule(){
    this.voitureService.get(this.matricule).subscribe({
      next:data=>{
        this.voitureData=data ;
        this.voitureDataImages=data;
        console.log(data)
      },
      error:err=>{console.log(err)}
    })
  }





  toggleHoverEffect(element: EventTarget | null) {
    if (element instanceof HTMLElement) {
      // Supprimer le style de survol de l'élément précédemment cliqué
      if (this.lastClicked !== null) {
        this.lastClicked.style.borderBottom = "none";
        this.lastClicked.style.cursor = "default";
      }

      // Appliquer le style de survol à l'élément actuellement cliqué
      element.style.borderBottom = "2px solid blue";
      element.style.cursor = "pointer";

      // Enregistrer l'élément actuellement cliqué
      this.lastClicked = element;
    }
  }







  scrollTo(id: string) {
    const element = this.elementRef.nativeElement.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

  handleClick(id: string) {
    // this.toggleHoverEffect(id);
    this.scrollTo(id);
  }

  exportToPDF() {
    const content = document.getElementById('content');

    // @ts-ignore
    html2canvas(content, { scale: 2 }).then(canvas => { // Utiliser une échelle de 2x pour augmenter la résolution
      const imgData = canvas.toDataURL('image/jpeg', 1.0); // Utiliser le format JPEG avec une qualité maximale

      const pdf = new jsPDF();
      const imgWidth = 210; // Largeur de la page A4
      const imgHeight = canvas.height * imgWidth / canvas.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight); // Utiliser le format JPEG pour une meilleure qualité
      pdf.save('export.pdf');
    });
  }



  getReseravtionbyMatricule(){
    this.reservationService.findReservationbyVoitureMatricule(this.matricule).subscribe({
      next:data=>{
        this.dataReservationVoiture=data;
        console.log(this.dataReservationVoiture);

        this.tableauDate = this.dataReservationVoiture.map(e => ({
          dateDebut: e.dateDebut,
          dateFin: e.dateFin
        }));

        console.log("tableau de dates");
        console.log(this.tableauDate);


        for (let i = 0; i < this.tableauDate.length; i++) {
          let currentDate = new Date(this.tableauDate[i].dateDebut);
          const endDate = new Date(this.tableauDate[i].dateFin);

          while (currentDate <= endDate) {
            this.days.push(currentDate.toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric'
            }));
            currentDate.setDate(currentDate.getDate() + 1);
          }
        }

        console.log("days");
        console.log(this.days.toString());
      }
    });
  }


  // getReseravtionApp(code :string){
  //   this.reservationService.findReservationbyAppCode(code).subscribe({
  //     next:(data)=>{
  //       this.dataReservationAppartement=data;
  //     }
  //   })
  // }



  getDataByUsername(){
    this.clienService.getByusername(this.authService.username).subscribe({
      next:(data)=>{
        this.dataLoaded=data;
      }
    })
  }

  RedirectversFacture_Paiment() {
    if(this.authService.isAuthService){
      if(this.authService.roles.includes('USER')){
        if (this.dataLoaded.nom && this.dataLoaded.prenom){
          this.handlReserve()
          this.router.navigateByUrl('/facture')
        } else this.router.navigateByUrl('/profile')
      }else {
        this.router.navigateByUrl('/facture')
      }
    }else {
      this.router.navigateByUrl('/login');
    }
  }

// ????????????????????????????? Calendrie////





  // myFilter = (date: Date | null): boolean => {
  //   // Example: Disable dates in the past
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0); // Set time to beginning of the day for comparison
  //   // @ts-ignore
  //   return date >= today; // Disable past dates
  // };


  myFilter = (date: Date | null): boolean => {
    if (!date) {
      return false; // Empêche la sélection de la date si elle est null
    }

    // Conversion de la date en format "mm/dd/yyyy"
    const dateString = (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getDate().toString().padStart(2, '0') + '/' + date.getFullYear().toString();

    // Vérification si la date est incluse dans this.days
    return !this.days.includes(dateString);
  };

  onDateInput(event: MatDatepickerInputEvent<Date>) {
    this.maDate = event.value!;
    console.log("this.maDate")
    console.log(this.maDate)
    const formattedDate: string = this.datePipe.transform(this.maDate, 'yyyy-MM-dd')!;
    console.log('Formatted Date:', formattedDate);

    const dateObject: Date = new Date(this.maDate);
    const dateNumber: number = dateObject.getTime();

    console.log('Date Number:', dateNumber); // Affiche le nombre de millisecondes depuis l'époque


    this.maDate2 = new Date(this.maDate); // Clonage de maDate
    this.display = !!this.maDate; // Affichage basé sur la présence de maDate
    this.nbrJours = 1;
  }



  dateSelected(event: MatDatepickerInputEvent<Date>) {
    console.log('Selected date:', event.value);
  }

  decrement() {
    if (this.nbrJours > 0) {
      this.nbrJours--;
      this.maDate2.setDate(this.maDate2.getDate() - 1);
    }
    this.logDates();
  }

  increment() {
    if (!this.days.includes(this.maDate2.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }))) {
      this.nbrJours++;
      this.maDate2.setDate(this.maDate2.getDate() + 1);
      this.logDates();
    }
  }

  logDates() {
    console.log('nbrJours:', this.nbrJours);
    console.log('maDate:', this.maDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }));
    console.log('maDate2:', this.maDate2.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }));
  }


  get item(): Reservation {
    return this.reservationService.item;
  }

  set item(value: Reservation) {
    this.reservationService.item = value;
  }

  get items(): Array<Reservation> {
    return this.reservationService.items;
  }

  set items(value: Array<Reservation>) {
    this.reservationService.items = value;
  }
  saveObject() {
    this.reservationService.save().subscribe({
      next: (data) => {
        if (data == 1) {


          setTimeout(() => {

            this.displaysucces = false;
          }, 3000);
          this.displaysucces = true;

          this.getReseravtionbyMatricule()
          this.ngOnInit()
        } else {
          console.log(data)
        }
      }
    })
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

  handlReserve() {
    if(this.authService.isAuthService) {
    console.log(this.maDate2, 'yyyy-MM-dd')
    console.log(this.maDate, 'yyyy-MM-dd')
    this.item.dateFin = this.datePipe.transform(this.maDate2, 'yyyy-MM-dd')!;
    this.item.dateDebut = this.datePipe.transform(this.maDate, 'yyyy-MM-dd')!;


    // this.item.voiture.id = this.voitureData.id;
    this.item.ref=this.generateRandomCode(4);
    this.item.voiture.couleur = this.voitureData.couleur;
    this.item.voiture.ville = this.voitureData.ville;
    this.item.voiture.prix = this.voitureData.prix;
    this.item.voiture.kiloMetrage = this.voitureData.kiloMetrage;
    this.item.voiture.nbrPlace = this.voitureData.nbrPlace;
    this.item.voiture.annee = this.voitureData.annee;
    this.item.voiture.matricule = this.voitureData.matricule;
    this.item.voiture.boitevitesse = this.voitureData.boitevitesse;
    this.item.voiture.images = this.voitureData.images;
    this.item.voiture.Carburant = this.voitureData.Carburant;
    this.item.voiture.sateVisitetechnique = this.voitureData.sateVisitetechnique;
    this.item.voiture.puissance = this.voitureData.puissance;
    this.item.voiture.dateAssurance = this.voitureData.dateAssurance;
    this.item.voiture.dateMisecirculation = this.voitureData.dateMisecirculation;
    this.item.voiture.nomModele = this.voitureData.nomModele;

    this.item.client.nom = this.authService.dataUtilisateur.nom;
    this.item.client.cin = this.authService.dataUtilisateur.cin;
    this.item.client.numTeleClient = this.authService.dataUtilisateur.numTeleClient;
    this.item.client.email_Client = this.authService.dataUtilisateur.email_Client;
    this.item.client.prenom = this.authService.dataUtilisateur.prenom;
    // this.item.client.id =this.authService.dataUtilisateur.id;
    console.log("this.item")
    console.log(this.item)
    this.saveObject();
    console.log("this.authService.client.cin===>" + this.authService.dataUtilisateur.cin)
    // console.log("this.authService.client.id===>"+this.authService.client.id)
    console.log("this.authService.dataUtilisateur.id===>" + this.authService.dataUtilisateur.id)




    //notifiacation :
    this.nItem.code =  this.generateRandomCode(5);
    this.nItem.dateFinReservation=this.datePipe.transform(this.maDate2, 'yyyy-MM-dd')!;
    this.nItem.dateDebutReservation=this.datePipe.transform(this.maDate, 'yyyy-MM-dd')!;
    this.nItem.matriculeVoiture = this.voitureData.matricule;
    this.nItem.cinClient = this.authService.dataUtilisateur.cin;
    this.nItem.nomClient=this.authService.dataUtilisateur.nom;
    this.nItem.iceAgence = this.voitureData.agenceLocation.iceAgLoc;
    this.nItem.nomClient = this.item.client.nom;
    this.nItem.refReservation=this.item.ref;
    this.NotificationSave();}
    else{
        this.display2=true
        // this.router.navigateByUrl("/login")
      }
  }





  NotificationSave(){
    this.notifiactionService.save().subscribe({
      next: (data)=>{
        if(data==1){
          alert('ok');
          console.log(data);
          alert(data)
        }
        alert(data)
      }
    })

  }

  get nItem(): Notifiaction {
    return this.notifiactionService.item;
  }

  set nItem(value: Notifiaction) {
    this.notifiactionService.item = value;
  }

  get nItems(): Array<Notifiaction> {
    return this.notifiactionService.items;
  }

  set nItems(value: Array<Notifiaction>) {
    this.notifiactionService.items = value;
  }
  navigateToHome(){
    this.router.navigateByUrl("/home")
  }
  anuller() {
    this.display2=false;
  }

}


