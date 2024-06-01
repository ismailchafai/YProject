import {Component, ElementRef, OnInit} from '@angular/core';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {ActivatedRoute, Router} from "@angular/router";
import {Appartement} from "../../sahred/model/appartemetModel/appartement.model";
import {AppartemetService} from "../../sahred/service/appartemetService/appartemet.service";
import {DatePipe} from "@angular/common";
import { MatDatepickerInputEvent} from "@angular/material/datepicker";
import {Reservation} from "../../sahred/model/communModel/reservation.model";
import {ReservationService} from "../../sahred/service/communService/reservation.service";
import {toNumbers} from "canvg";
import {AuthService} from "../../security/serviceAuth/auth.service";
import {Notifiaction} from "../../sahred/model/notificationModel/notifiaction.model";
import {NotifiactionService} from "../../sahred/service/notificationService/notifiaction.service";

@Component({
  selector: 'app-facteur-apparetement',
  templateUrl: './facteur-apparetement.component.html',
  styleUrl: './facteur-apparetement.component.css'
})
export class FacteurApparetementComponent implements OnInit {

  lastClicked: HTMLElement | null = null;
  code: any;
  apparetement = new Appartement();
  nbrJours = 1;
  maDate!:Date;
  maDate2!:Date;
  dataReservationAppartement: Array<Reservation> = new Array<Reservation>();
  tableauDate: any;
  days: string[] = [];
  display = false;
  display2 = false;
  display3 = false;
  displaysucces: boolean = false;


  constructor(private elementRef: ElementRef, private reservationService: ReservationService,
              private route: ActivatedRoute, private appartementService: AppartemetService,
              private datePipe: DatePipe,private authService:AuthService, private notifiactionService:NotifiactionService
              ,private router : Router) {
  }

  ngOnInit(): void {
    const defaultActiveElement = this.elementRef.nativeElement.querySelector('.nav-item.active');
    this.toggleHoverEffect(defaultActiveElement);
    this.route.params.subscribe(params => {
      this.code = params['code'];
      console.log(this.code);
    });
    this.getApparetementByCode();
    this.getReservationApp();

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
      element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }
  }

  handleClick(id: string) {
    // this.toggleHoverEffect(id);
    this.scrollTo(id);
  }

  exportToPDF() {
    const content = document.getElementById('content');

    // @ts-ignore
    html2canvas(content, {scale: 2}).then(canvas => { // Utiliser une échelle de 2x pour augmenter la résolution
      const imgData = canvas.toDataURL('image/jpeg', 1.0); // Utiliser le format JPEG avec une qualité maximale

      const pdf = new jsPDF();
      const imgWidth = 210; // Largeur de la page A4
      const imgHeight = canvas.height * imgWidth / canvas.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight); // Utiliser le format JPEG pour une meilleure qualité
      pdf.save('export.pdf');
    });
  }


  getApparetementByCode() {
    this.appartementService.get(this.code).subscribe({
      next: data => {
        console.log(data)
        this.apparetement = data;
        this.appartemetDataImages=data
      },
      error: err => {
        console.log(err)
      }
    })
  }

  getReservationApp() {
    this.reservationService.findReservationbyAppCode(this.code).subscribe({
      next:data => {
        this.dataReservationAppartement = data;
        console.log("this.dataReservationAppartement");
        console.log(this.dataReservationAppartement);
        this.tableauDate = this.dataReservationAppartement.map(e => ({
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


// ????????????????????????????? Calendrie////


  // myFilter = (date: Date | null): boolean => {
  //   // Example: Disable dates in the past
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0); // Set time to beginning of the day for comparison
  //   // @ts-ignore
  //   return date >= today; // Disable past dates
  // };

  // myFilter = (date: Date | null): boolean => {
  //   if (!date) {
  //     return false;
  //   }
  //
  //
  //   // @ts-ignore
  //   return !this.days.includes(date.getDate()); // Filtrer la date si elle ne correspond à aucun intervalle
  // };

// Exemple d'utilisation


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

  // onDateInput(event: MatDatepickerInputEvent<Date>) {
  //   this.maDate = event.value!;
  //   const formattedDate: string = this.datePipe.transform(this.maDate, 'yyyy-MM-dd')!;
  //   console.log('Formatted Date:', formattedDate);
  //
  //   // Utilisation du constructeur Date pour convertir la chaîne de caractères en objet Date
  //   this.maDate3 = new Date(formattedDate);
  //   console.log('this.maDate3:', this.maDate3);
  //
  //   this.maDate2 = new Date(this.maDate); // Clonage de maDate
  //   this.display = !!this.maDate; // Affichage basé sur la présence de maDate
  // }

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
      next:data => {
        if (data == 1) {
          // alert("Nice Bro")
          setTimeout(() => {

            this.displaysucces = false;
          }, 3000);
          this.displaysucces = true;
          this.getReservationApp()
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


  handlReserve(){
    if(this.authService.isAuthService) {
      console.log(this.maDate2, 'yyyy-MM-dd')
      console.log(this.maDate, 'yyyy-MM-dd')
      this.item.dateFin = this.datePipe.transform(this.maDate2, 'yyyy-MM-dd')!;
      this.item.dateDebut = this.datePipe.transform(this.maDate, 'yyyy-MM-dd')!;

      this.item.ref = this.generateRandomCode(4);
      this.item.appartement.id = this.apparetement.id;
      this.item.appartement.code = this.apparetement.code;
      this.item.appartement.wifi = this.apparetement.wifi;
      this.item.appartement.climatiseur = this.apparetement.climatiseur;
      this.item.appartement.loyerMensuel = this.apparetement.loyerMensuel;
      this.item.appartement.superficie = this.apparetement.superficie;
      this.item.appartement.ville = this.apparetement.ville;
      this.item.appartement.adresse = this.apparetement.adresse;
      this.item.appartement.nmbrPersont = this.apparetement.nmbrPersont;
      this.item.appartement.images = this.apparetement.images;
      this.item.appartement.nmbrPersont = this.apparetement.nmbrPersont;

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
      this.nItem.code = this.generateRandomCode(5);
      this.nItem.dateFinReservation = this.datePipe.transform(this.maDate2, 'yyyy-MM-dd')!;
      this.nItem.dateDebutReservation = this.datePipe.transform(this.maDate, 'yyyy-MM-dd')!;
      this.nItem.codeAppartement = this.apparetement.code;
      this.nItem.cinClient = this.authService.dataUtilisateur.cin;
      this.nItem.nomClient = this.authService.dataUtilisateur.nom;
      this.nItem.iceAgence = this.apparetement.propAppartemenetDto.iceAgApp;
      this.nItem.refReservation = this.item.ref;
      this.NotificationSave();
    }
    else{
      this.display2=true
      // this.router.navigateByUrl("/login")
    }
  }



  public appartemetDataImages:any;

  returnUrl(apartement:any):string{
    console.log("verifier data:::")
    console.log(this.appartemetDataImages)
    return apartement.imagePaths[0]
  }


  NotificationSave(){
    this.notifiactionService.save().subscribe({
      next: (data)=>{
        if(data==1){
          alert("la notification est save avec s'acces");
        }else console.log(data);
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

  anuller() {
    this.display2=false;
  }

  handleMessage(){
    this.display3=true;
  }
}
