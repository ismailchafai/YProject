import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CreatAppartemetComponent
} from "./view/appartemetComponent/appartemet/creat-appartemet/creat-appartemet.component";
import {NavbarComponent} from "./layout/navbar/navbar.component";
import {AdminTemplateComponent} from "./security/admin-template/admin-template.component";
import {
  CreatCategoriesAppartementComponent
} from "./view/appartemetComponent/categoriesAppartement/creat-categories-appartement/creat-categories-appartement.component";
import {
  CreatPropAppartementComponent
} from "./view/appartemetComponent/propAppartement/creat-prop-appartement/creat-prop-appartement.component";
import {ListAppartemetComponent} from "./view/appartemetComponent/appartemet/list-appartemet/list-appartemet.component";
import {AuthenticationGuard} from "./security/guards/authentication.guard";
import {AuthorizationGuard} from "./security/guards/authorization.guard";
import {SignInMessageComponent} from "./layout/sign-in-message/sign-in-message.component";
import {SignInNotificationComponent} from "./layout/sign-in-notification/sign-in-notification.component";
import {NotFoundPageComponent} from "./layout/not-found-page/not-found-page.component";
import {VideMessageComponent} from "./layout/vide-message/vide-message.component";
import {VideNotificationComponent} from "./layout/vide-notification/vide-notification.component";
import {ListVoitureComponent} from "./view/voitureComponent/voiture/list-voiture/list-voiture.component";
import {
  CreatCategorieVoitureComponent
} from "./view/voitureComponent/categorieVoiture/creat-categorie-voiture/creat-categorie-voiture.component";
import {CreatContratComponent} from "./view/communComponent/contrat/creat-contrat/creat-contrat.component";
import {CreatFactureComponent} from "./view/communComponent/facture/creat-facture/creat-facture.component";
import {CreatLocationComponent} from "./view/communComponent/location/creat-location/creat-location.component";
import {LoginComponent} from "./security/login/login.component";
import {ProfileComponent} from "./layout/profile/profile/profile.component";
import {authGuard} from "./layout/navbar/garde/garde";
import {CarouselTestComponent} from "./layout/carousel-test/carousel-test.component";
import {HomeComponent} from "./layout/home/home.component";
import {CreatPaiementComponent} from "./view/communComponent/paiement/creat-paiement/creat-paiement.component";
import {
  CreatAgenceLocationComponent
} from "./view/voitureComponent/agenceLocation/creat-agence-location/creat-agence-location.component";
import {CreatClientComponent} from "./view/communComponent/client/creat-client/creat-client.component";
import {ProdileEzzComponent} from "./layout/profile/prodile-ezz/prodile-ezz.component";

import { ReservationInformationComponent } from './layout/reservation-information/reservation-information.component.js';
import {
  CreatReservationComponent
} from "./view/communComponent/reservation/creat-reservation/creat-reservation.component";
import {CreatVoitureComponent} from "./view/voitureComponent/voiture/creat-voiture/creat-voiture.component";
import {FactureComponent} from "./layout/facture/facture.component";
import {ContratLoactionComponent} from "./layout/contrat-loaction/contrat-loaction.component";
import {FacteurApparetementComponent} from "./layout/facteur-apparetement/facteur-apparetement.component";
import {NotificationInfoComponent} from "./notification-info/notification-info.component";
import {NotificationComponent} from "./view/notification/notification.component";
import {ChartsAppartementComponent} from "./layout/charts-appartement/charts-appartement.component";
import {ChartsComponent} from "./layout/charts/charts.component";
import {HomeChartsComponent} from "./layout/home-charts/home-charts.component";
import {ChatComponent} from "./layout/chat/chat.component";
const routes: Routes = [
  { path: "home", component:HomeComponent},
  { path :"login", component : LoginComponent},
  { path :"", redirectTo:"/home",pathMatch:"full"},
  { path: "message", component: SignInMessageComponent },
  { path: "notification", component: SignInNotificationComponent },
  { path: "videMessage/:username", component: VideMessageComponent ,canActivate:[authGuard]},
  { path: "videNotification", component: VideNotificationComponent ,canActivate:[authGuard]},
  { path: "listeVoiture", component: CreatCategorieVoitureComponent },
  { path: "reservationInformation/:matricule", component: ReservationInformationComponent },
  { path: "facteurApparetement/:code", component: FacteurApparetementComponent },
  { path: "editProfile", component: ProfileComponent,canActivate:[authGuard] },
  { path: "profile", component: ProdileEzzComponent},
  { path: "facture", component: FactureComponent},
  { path: "factureApp", component: FacteurApparetementComponent},
  { path: "contrat", component: ContratLoactionComponent},
  { path: "notificationBean", component: NotificationComponent},
  { path: "charts", component: HomeChartsComponent},

  { path :"admin",component:AdminTemplateComponent,canActivate:[AuthenticationGuard],children:[
      { path :"appartemet",component:CreatAppartemetComponent},
      { path :"categoriesapp",component:CreatCategoriesAppartementComponent},
      { path :"propraitaire",component:CreatPropAppartementComponent},
      { path :"listAppartemetCompoent",component:ListAppartemetComponent},
      { path: "createContrat" , component:CreatContratComponent},
      { path: "createFacteur" , component:CreatFactureComponent},
      { path: "createLocation" , component:CreatLocationComponent},
      { path: "createClient" , component:CreatClientComponent},
      { path: "createAgence" , component:CreatAgenceLocationComponent},
      { path: "createPaiement" , component:CreatPaiementComponent},
      { path: "createVoiture" , component: CreatVoitureComponent},
      { path: "createCategorieVoiture" , component:CreatCategorieVoitureComponent},
      { path: "createReservation" , component: CreatReservationComponent},
    ]},
  { path :"propreAppartement",component:AdminTemplateComponent,canActivate:[AuthenticationGuard],children:[
      { path :"appartemet",component:CreatAppartemetComponent},
      { path: "notification999", component: NotificationInfoComponent },
      { path :"categoriesapp",component:CreatCategoriesAppartementComponent},
      { path :"propraitaire",component:CreatPropAppartementComponent},
      { path :"listAppartemetCompoent",component:ListAppartemetComponent},
      { path: "createContrat" , component:CreatContratComponent},
      { path: "createFacteur" , component:CreatFactureComponent},
      { path: "createLocation" , component:CreatLocationComponent},
      { path: "createClient" , component:CreatClientComponent},
      { path: "createAgence" , component:CreatAgenceLocationComponent},
      { path: "createPaiement" , component:CreatPaiementComponent},
      { path: "createReservation" , component: CreatReservationComponent},
    ]},
  { path :"agenceLocation",component:AdminTemplateComponent,canActivate:[AuthenticationGuard],children:[
      { path :"propraitaire",component:CreatPropAppartementComponent},
      { path :"listAppartemetCompoent",component:ListAppartemetComponent},
      { path: "createContrat" , component:CreatContratComponent},
      { path: "createFacteur" , component:CreatFactureComponent},
      { path: "createLocation" , component:CreatLocationComponent},
      { path: "createClient" , component:CreatClientComponent},
      { path: "createAgence" , component:CreatAgenceLocationComponent},
      { path: "createPaiement" , component:CreatPaiementComponent},
      { path: "createVoiture" , component: CreatVoitureComponent},
      { path: "createCategorieVoiture" , component:CreatCategorieVoitureComponent},
      { path: "createReservation" , component: CreatReservationComponent},
    ]},


  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
