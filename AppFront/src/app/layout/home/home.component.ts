import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Voiture} from "../../sahred/model/voitureModel/voiture.model";
import {CategoriesAppartement} from "../../sahred/model/appartemetModel/categories-appartement.model";
import {Appartement} from "../../sahred/model/appartemetModel/appartement.model";
import {VoitureService} from "../../sahred/service/voitureService/voiture.service";
import {CategoriesAppartementService} from "../../sahred/service/appartemetService/categories-appartement.service";
import {AppartemetService} from "../../sahred/service/appartemetService/appartemet.service";
import {Router} from "@angular/router";
import {CategorieVoitureService} from "../../sahred/service/voitureService/categorie-voiture.service";
import {CategorieVoiture} from "../../sahred/model/voitureModel/categorie-voiture.model";
import {villesMaroc} from "../constant-app/villes-maroc.module";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,AfterViewInit{
  lastClicked: HTMLElement | null = null;

  // Variale
  public obejetClicked:boolean=true;
  public formatcard:boolean=false;
  public isClicked:boolean=false;
  public selected:boolean =true;

  // Variable Voiture
  public dataVoiture:Array<Voiture>=new Array<Voiture>();
  public categoriesVoiture:Array<CategorieVoiture>=new Array<CategorieVoiture>();
  public listeVoiture:Array<Voiture>=new Array<Voiture>();
  public  categorievoitSelected: string="";
  protected modeles!: any[];
  protected modeleSelcted:string="";
  public selecCategorieVoi:any;
  // Variable Apparetement
  public dataCategorieApartement:Array<CategoriesAppartement>=new Array<CategoriesAppartement>();
  public dataApartement:any[]=[];
  public dataApartement2:Array<Appartement>=new Array<Appartement>();
  public selecCategorieApt:any;

  public dataByPrixApparetement:Array<Appartement>=new Array<Appartement>();
  private images: any;



  constructor(private voitureService:VoitureService , private categoreieappartemetService:CategoriesAppartementService ,
              private apartement:AppartemetService,private router:Router, private categorievoitservice:CategorieVoitureService,
              private appartemetService:AppartemetService,private elementRef: ElementRef ,private renderer: Renderer2) {
  }


  ngOnInit(): void {
    this.getAll();
    this.getAllCategoriesApt();
    this.getAllApartement();
    this.getAllCategorie();
    this.getville();

  }
  ngAfterViewInit() {
  

  }

  // ++++++++++++++++++++++++++++++++++++++APPARETEMENT+++++++++++++++++++++
  public  getAllCategoriesApt(){
    this.categoreieappartemetService.getAll().subscribe({
      next:data=>{
        this.dataCategorieApartement=data
      },
      error:err => {
        console.log(err)
      }
    })
  }

  public getAllApartement(){
    this.apartement.getAll().subscribe({
      next:data=>{
        this.dataApartement=data
        this.dataApartement2=data
        console.log("dataApartement")
        console.log(this.dataApartement)
      },
      error:err => {
        console.log("verfie getAll Apparetement")
      }
    })
  }
  public getAllByCategorierAPT(libelle:string){
    this.apartement.getAppartemetsbyLibelle(libelle).subscribe({
      next:data=>{
        this.dataApartement=data ;
        this.dataApartement2=data;
      },
      error:err=>{
        console.log("verifie getByCategorieAppartement");
      }
    })
  }
  public onCategorieChange(){
    if(this.selecCategorieApt == ""){this.getAllApartement()}
    else{
      // this.getAllApartement()
      this.getAllByCategorierAPT(this.selecCategorieApt)
    }

    console.log("dataselectcate====>"+this.selecCategorieApt)
  }
  public apparetementByMontant(){
    if(this.villSelected == ''){
      this.onCategorieChange()
      // if(this.selecCategorieApt===""){
      //   this.getAll();
      // }else{
      //   this.getAllByCategorierAPT(this.selecCategorieApt);
      // }
    }else {
      alert(this.villSelected)
      this.dataApartement = this.dataApartement2
      this.dataApartement = this.dataApartement.filter(appartement => appartement.adresse === this.villSelected);
    }
  }
  villes = villesMaroc;
  villSelected:string="" ;










//+++++++++++++++++++++++++Voiture+++++++++++++++++++++++++++++++
  public clicVoiture() {
    this.obejetClicked=true;
  }
  public clicApp() {
    this.obejetClicked=false;
  }
  handleClick(id: string) {
    // this.toggleHoverEffect(id);
    this.scrollTo(id);
  }
  scrollTo(id: string) {
    const element = this.elementRef.nativeElement.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }
  }

  handelVertical() {
    this.formatcard=false
  }

  handelHorizental() {
    this.formatcard=true;

  }


  horizentalClic(){
    this.isClicked=true;
  }

  getAll(){
    this.voitureService.getAll().subscribe({
      next:(data)=>{
        this.dataVoiture=data;
        this.listeVoiture=data;
        this.extractModeleNames();
      },
      error:(err) => console.log(err)
    })

  }

  getAllCategorie(){
    this.categorievoitservice.getAll().subscribe({
      next:(data)=>{
        this.categoriesVoiture=data;
      },
    })
  }

  findByCategorieVoiture(libelle : string){
    this.voitureService.findVoitureByCategoriLibelle(libelle).subscribe({
    next:(data)=>{
      this.dataVoiture = data;
    }
    })
  }

  findByCategorieVoitureAndNomModele(model:string ,libelle: string){
    this.voitureService.findVoitureByModeleAndCategorie(model,libelle)
  }

  findVoiturebyModele(model:string){
    this.voitureService.findVoitureByModele(model).subscribe({
      next:(data)=>{
        this.dataVoiture=data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  handelSearcheByCategorie() {

    if(this.categorievoitSelected!="" && this.modeleSelcted==""){
      if(this.categorievoitSelected=="all") this.getAll();
      else this.findByCategorieVoiture(this.categorievoitSelected);
  } else if(this.categorievoitSelected=="" && this.modeleSelcted!=""){
      if(this.modeleSelcted=="all") this.getAll();
      else this.findVoiturebyModele(this.modeleSelcted);
    }
    else
      this.findByCategorieVoitureAndNomModele(this.modeleSelcted,this.categorievoitSelected)
  }
  extractModeleNames(): void {
    this.modeles = Array.from(new Set(this.listeVoiture.map(voiture => voiture.nomModele)));
  }

  public getville(){
    if( this.villSelected!=""){
      this.dataVoiture = this.dataVoiture.filter(voitureService => voitureService.ville === this.villSelected);
    } }

//+++++++++++++++++++++++++++++++++APP+++++++++++++++++++++++++++++++++


  handelSearch() {
    this.selected=false;
  }

  handelPrev() {
    this.selected=true;
  }
  //
  //
  // public  getAllCategoriesApt(){
  //   this.categoreieappartemetService.getAll().subscribe({
  //     next:data=>{
  //       this.dataCategorieApartement=data
  //     },
  //     error:err => {
  //       console.log(err)
  //     }
  //   })
  // }
  //
  // public getAllApartement(){
  //   this.apartement.getAll().subscribe({
  //     next:data=>{
  //       this.dataApartement=data
  //     },
  //     error:err => {
  //       console.log("verfie getAll Apparetement")
  //     }
  //   })
  // }
  // public getAllByCategorierAPT(libelle:string){
  //   this.apartement.getAppartemetsbyLibelle(libelle).subscribe({
  //     next:data=>{
  //       this.dataApartement=data ;
  //     },
  //     error:err=>{
  //       console.log("verifie getByCategorieAppartement");
  //     }
  //   })
  // }
  // onCategorieChange(){
  //   if(this.selecCategorieApt===""){this.getAllApartement()}
  //   this.getAllByCategorierAPT(this.selecCategorieApt)
  //   console.log("dataselectcate====>"+this.selecCategorieApt)
  // }
  // public apparetementByMontant(){
  //   if(this.villSelected == ''){
  //     this.onCategorieChange()
  //     // if(this.selecCategorieApt===""){
  //     //   this.getAll();
  //     // }else{
  //     //   this.getAllByCategorierAPT(this.selecCategorieApt);
  //     // }
  //   }else {
  //     alert(this.villSelected)
  //     this.dataApartement = this.dataApartement2
  //     this.dataApartement = this.dataApartement.filter(appartement => appartement.adresse === this.villSelected);
  //   }
  // }
  // ville: any[] =[ "Agadire","Safi","Zagora", "Rabat"];
  // villSelected!:string;
  //
  //
  //


  // returnUrl(appartemet: any):string {
  //   return 'data:'+appartemet.images[0].type+';base64,' + appartemet.images[0].picByte;
  // }

  returnUrl(appartemet: any):string {
    return appartemet.imagePaths[0]
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



}








