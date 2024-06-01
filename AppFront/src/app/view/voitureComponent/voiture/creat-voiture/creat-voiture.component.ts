import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {VoitureService} from "../../../../sahred/service/voitureService/voiture.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CategorieVoitureService} from "../../../../sahred/service/voitureService/categorie-voiture.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {CategorieVoiture} from "../../../../sahred/model/voitureModel/categorie-voiture.model";
import {AgenceLocation} from "../../../../sahred/model/voitureModel/agence-location.model";
import {Voiture} from "../../../../sahred/model/voitureModel/voiture.model";
import {AgenceLocationService} from "../../../../sahred/service/voitureService/agence-location.service";
import {FileHandle} from "../../../../sahred/model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";
import {Appartement} from "../../../../sahred/model/appartemetModel/appartement.model";
import {AuthService} from "../../../../security/serviceAuth/auth.service";
import {villesMaroc} from "../../../../layout/constant-app/villes-maroc.module";

@Component({
  selector: 'app-creat-voiture',
  templateUrl: './creat-voiture.component.html',
  styleUrl: './creat-voiture.component.css'
})
export class CreatVoitureComponent  implements OnInit, AfterViewInit {



  public  images:any;
  displayImagesByCode: boolean=false;
  selectedVoitureItem:Voiture={
    couleur:  "",
    nbrPlace: "",
    matricule: "",
    kiloMetrage: "",
    boitevitesse: "",
    annee:  0,
    ville: "",
    dateMisecirculation: new Date(),
    dateAssurance: new Date(),
    sateVisitetechnique: new Date(),
    nomModele: "",
    images: [],
    categorie:new CategorieVoiture(),
    agenceLocation: new AgenceLocation(),
    prix:  0,
    puissance:  0,
    Carburant: "",
  }

  isEdit :boolean=false;
  isCreate :boolean=false;

  public dataSource!: MatTableDataSource<any>;
  public display:boolean = false;
  public submitted:boolean=false;
  public categorie:Array<CategorieVoiture>=new Array<CategorieVoiture>();
  public agencesLocations:Array<AgenceLocation>=new Array<AgenceLocation>();
  public ListeColum = [
    "couleur","photo","nbrPlace","matricule","kiloMetrage","boitevitesse","annee","ville","dateMisecirculation"
    ,"dateAssurance","sateVisitetechnique","nomModele","prix","puissance","Carburant","categorie","agenceLocation","action"
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;


  villes:any;
  constructor(private authService:AuthService,private sanitizer:DomSanitizer, protected service:VoitureService, private categorieService:CategorieVoitureService, private agenceService :AgenceLocationService) {

  }

  ngOnInit(): void {
    this.villes=villesMaroc;
    this.getAll();
    this.getAllCategorie();
    this.getAllAgence();
    this.item.categorie=new CategorieVoiture();
    this.item.agenceLocation=new AgenceLocation();
  }

  getAllCategorie(){
    this.categorieService.getAll().subscribe({
      next:(data)=>{this.categorie=data}})
  }

  getAllAgence(){
    this.agenceService.getAll().subscribe({next:(data)=>{this.agencesLocations=data}})
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }




  /**********************************************************************/
  prepareFormData(voiture:Voiture):FormData{
    const  formData=new FormData();
    formData.append(
      'voiture'
      , new Blob(
        [JSON.stringify(voiture)],
        {type:'application/json'}
      ));

    for (var i=0;i<voiture.images.length;i++){
      formData.append(
        'imageFile',
        voiture.images[i].file,
        voiture.images[i].file.name
      );
    }
    return formData;
  }


  fileDropped(fileHandle: FileHandle) {
    this.service.item.images.push(fileHandle);
  }


  oneFileSelected($event: Event) {
    // @ts-ignore
    if($event.target.files){
      // @ts-ignore
      const  file=$event.target.files[0];

      console.log(file);
      const fileHandle:FileHandle={
        file:file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      console.log(fileHandle)
      console.log(this.service.item.images)
      this.service.item.images.push(fileHandle);
    }
  }



  removeImages(i:number) {
    this.service.item.images.splice(i,1);
  }





  /**********************************************************************/


  public getAll(){
    this.service.getAll().subscribe({
      next:(data)=>{

        this.items=data;
        this.dataSource = new MatTableDataSource<any>(this.items);

        if(data.length!=0){console.log(data); }
      },
      error:(err)=>{
        console.log('verifier getAll categorie Voiture');
      }
    })
  }



  showDialog() {
    this.isCreate=true;
    this.isEdit=false;
    this.display = true;
  }

  saveObject() {
    this.item.agenceLocation.iceAgLoc=this.authService.dataUtilisateur.iceAgLoc;
    console.log(this.item)
    const formData=this.prepareFormData(this.item);
    console.log(formData);
    this.service.save(formData).subscribe({
      next:(data)=>{
        if(data==1){
          this.submitted = true;
          this.display=false;
          this.getAll();
        }
        else {
          console.log(data)
        }
      }
    })


  }




  hideDialog() {
    this.display=false;
    this.submitted = false;
  }

  exportToPDF() {
    const content = document.getElementById('content');

    // @ts-ignore
    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();

      const imgWidth = 210; // Largeur de la page A4
      const imgHeight = canvas.height * imgWidth / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('export.pdf');
    });
  }




  search(event: Event) {
    let value=(event.target as HTMLInputElement).value;
    this.dataSource.filter=value;
  }



  get item(): Voiture {
    return this.service.item ;
  }

  set item(value: Voiture) {
    this.service.item = value;
  }

  get items(): Array<Voiture> {
    return this.service.items;
  }

  set items(value: Array<Voiture>) {
    this.service.items = value;
  }

  editProduct(item: Voiture) {
    this.isCreate=false;
    this.isEdit=true
    this.selectedVoitureItem = Object.assign({}, item);
    this.display = true;
  }


  public  handlDelete(matricule:string){
    this.service.delete(matricule).subscribe({
      next:(data) => {
        this.getAll();
        if(data==1) alert('deleted')
      },
      error:(err) => {
        console.log(err)
      }
    })
  }



  photoByMatricule(voiture:any) {
        this.images=voiture.imagePaths
        this.displayImagesByCode=true;
  }

  removeFromCloudinary(photo: string) {
    this.service.deleteImageCloudinary(photo)
  }



  EditObject() {
    console.log(this.selectedVoitureItem)
    this.item.images=this.selectedVoitureItem.images;
    this.item.agenceLocation.iceAgLoc=this.authService.dataUtilisateur.iceAgLoc;

    if(this.item.couleur==""){
      this.item.couleur=this.selectedVoitureItem.couleur
    }
    if(this.item.nbrPlace==""){
      this.item.nbrPlace=this.selectedVoitureItem.nbrPlace
    }

    if(this.item.matricule==""){
      this.item.matricule=this.selectedVoitureItem.matricule
    }
    if(this.item.kiloMetrage==""){
      this.item.kiloMetrage=this.selectedVoitureItem.kiloMetrage
    }
    if(this.item.boitevitesse==""){
      this.item.boitevitesse=this.selectedVoitureItem.boitevitesse
    }
    if(this.item.annee==0){
      this.item.annee=this.selectedVoitureItem.annee
    }
    if(this.item.ville==""){
      this.item.ville=this.selectedVoitureItem.ville
    }
    if(!this.item.dateMisecirculation){
      this.item.dateMisecirculation=this.selectedVoitureItem.dateMisecirculation
    }
    if(!this.item.dateAssurance){
      this.item.dateAssurance=this.selectedVoitureItem.dateAssurance
    }
    if(!this.item.sateVisitetechnique){
      this.item.sateVisitetechnique=this.selectedVoitureItem.sateVisitetechnique
    }
    if(this.item.nomModele==""){
      this.item.nomModele=this.selectedVoitureItem.nomModele
    }
    if(this.item.categorie.libelle==null){
      this.item.categorie=this.selectedVoitureItem.categorie
    }
    if(!this.item.prix){
      this.item.prix=this.selectedVoitureItem.prix
    }
    if(!this.item.puissance){
      this.item.puissance=this.selectedVoitureItem.puissance
    }
    if(!this.item.Carburant){
      this.item.Carburant=this.selectedVoitureItem.Carburant
    }
    this.service.update(this.item).subscribe({
      next:(data)=>{
        if(data==1){
          this.display=false
          this.getAll();
        }else{
          console.log(data);
        }
      }
    })
  }
}
