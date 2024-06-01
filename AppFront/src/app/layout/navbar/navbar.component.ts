import {AfterViewInit, Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../security/serviceAuth/auth.service";
import {RedirectService} from "../../sahred/service/LayoutService/RedirectService.service";
import {TranslateService} from "@ngx-translate/core";
import {AgenceAppartementService} from "../../sahred/service/appartemetService/agence-appartement.service";
import {AgenceLocation} from "../../sahred/model/voitureModel/agence-location.model";
import {AgenceLocationService} from "../../sahred/service/voitureService/agence-location.service";
import {NotifiactionService} from "../../sahred/service/notificationService/notifiaction.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  protected nbrNotification: number=0;
  selectedLanguage: string='English';
  logo:any;
  isMenuToggle:boolean=false;
  roleUrl!:string;
  constructor(private notificationService:NotifiactionService,private agenceLocationService:AgenceLocationService,private propAppartementService :AgenceAppartementService ,public authService: AuthService,private router: Router, private redirectService:RedirectService,private translateService:TranslateService) {
    this.translateService.setDefaultLang('en');

  }

  lettere !:string ;
  premierLettre(){
    this.lettere = this.authService.username[0];
    console.log(this.lettere)
  }
  calculeNumberNotificationPropAppartemet(){
    this.nbrNotification=0
    this.notificationService.getALlCinProp(this.authService.dataUtilisateur.iceAgApp).subscribe({
      next:data=>{
        this.authService.notifications=data
        console.log(this.authService.notifications)
        this.authService.notifications.map((n)=>{
          console.log(n)
          if(!n.isVisible){
            this.nbrNotification=this.nbrNotification+1
          }
        })
      },
      error:err=>{console.log(err)}
    })
  }

  calculeNumberNotificationAgenceVoiture(){
    this.nbrNotification=0
    this.notificationService.getALlByIceAgence(this.authService.dataUtilisateur.iceAgLoc).subscribe({
      next:data=>{
        this.authService.notifications=data
        console.log(this.authService.notifications)
        this.authService.notifications.map((n)=>{
          console.log(n)
          if(!n.isVisible){
            this.nbrNotification=this.nbrNotification+1
          }
        })
      },
      error:err=>{console.log(err)}
    })
  }


  calculeNumberNotificationClient(){
    this.nbrNotification=0
    this.notificationService.getALlByCinClient(this.authService.dataUtilisateur.cin).subscribe({
      next:data=>{
        this.authService.notifications=data
        console.log(this.authService.notifications)
        this.authService.notifications.map((n)=>{
          console.log(n)
          if(!n.isVisible){
            this.nbrNotification=this.nbrNotification+1
          }
        })
      },
      error:err=>{console.log(err)}
    })
  }

   ngOnInit(): void {
     this.premierLettre();
    if(this.authService.isAuthService){
      this.authService.getByUsername(this.authService.username)?.subscribe({
        next:data=>{
          this.authService.dataUtilisateur=data
          this.logo=this.authService.dataUtilisateur.imagePaths
          if(this.authService.roles.includes("MANAGER-VOI")){
            this.calculeNumberNotificationAgenceVoiture()
          }
          else  if(this.authService.roles.includes("MANAGER-APT")){
            this.calculeNumberNotificationPropAppartemet();
          }else  if(this.authService.roles.includes("USER")){
            this.calculeNumberNotificationClient();
          }
        },
        error:error=>{console.log(error)}
      })
    }
    else  if (this.authService.isAuthService && this.authService.roles.includes("MANAGER-APT")) {
    }
    else if(this.authService.isAuthService && this.authService.roles.includes("MANAGER-VOI")){
      // try {
      //   const logos =  this.agenceLocationService.getImagesByIceAgLoc(this.authService.username).toPromise();
      //   this.logo = logos[0];
      // }
      // catch (err) {
      //   console.log(err);
      // }
    }
  }
  nameUrlROle(url:string){
    if(this.authService.roles.includes('MANAGER-VOI')){
      // this.roleUrl="agenceLocation";
      this.router.navigateByUrl(`/agenceLocation/${url}`)
    }
    if(this.authService.roles.includes('MANAGER-APT')){
      // this.roleUrl="propreAppartement"
      this.router.navigateByUrl(`/propreAppartement/${url}`)
    }
  }
  SwitchLanguage(lang:string) {
    this.translateService.use(lang);
    if(lang==='en'){
      this.selectedLanguage='English'
    }else if(lang==='fr'){
      this.selectedLanguage='Français'
    }else
      this.selectedLanguage='العربية'
        //this.selectedLanguage = lang === 'en' ? 'English' : 'Français';
  }
  handleLogout() {

    this.authService.logout();
    this.isMenuToggle=false;

  }



  onMessageClick(): void {
    if (!this.authService.isAuthService) {
      this.redirectService.setRedirectUrl('/message');
    } else {
      //logique si le messagerie n'est pas vide
      this.router.navigateByUrl('/videMessage')
    }
  }

  onNotificationClick(): void {
    if(!this.authService.isAuthService)
      this.router.navigateByUrl('/videNotification')
    else
      this.router.navigateByUrl('/propreAppartement/notification999')
  }

  toggleMenu() {
    console.log(this.isMenuToggle)
    this.isMenuToggle=!this.isMenuToggle;
  }

  toggleMenuColose() {
    this.isMenuToggle=false;
  }



  LogoByIceAgApp(iceAgApp:any) {
    this.propAppartementService.getImagesByIceAgApp(iceAgApp).subscribe(
      {
        next:data=>{
         this.logo=data;
        }
      }
    )
  }

  // le but hewa behala url deyal photo lijate men base donner
  getImageData(photo:any) {
    return 'data:'+photo.type+';base64,' + photo.picByte;
  }



  appelCompoenetNotification() {
    this.isAffaiche=true
  }

  get isAffaiche(): boolean {
    return this.notificationService.isAffaiche;
  }

  set isAffaiche(value: boolean) {
    this.notificationService.isAffaiche = value;
  }
}
