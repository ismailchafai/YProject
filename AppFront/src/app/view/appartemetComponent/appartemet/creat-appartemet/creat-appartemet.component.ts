import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Appartement} from "../../../../sahred/model/appartemetModel/appartement.model";
import {CategoriesAppartement} from "../../../../sahred/model/appartemetModel/categories-appartement.model";
import {AgenceAppartement} from "../../../../sahred/model/appartemetModel/AgenceAppartement.model";
import {AppartemetService} from "../../../../sahred/service/appartemetService/appartemet.service";
import {
  CategoriesAppartementService
} from "../../../../sahred/service/appartemetService/categories-appartement.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {AuthService} from "../../../../security/serviceAuth/auth.service";
import {FileHandle} from "../../../../sahred/model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";
import {villesMaroc} from "../../../../layout/constant-app/villes-maroc.module"
@Component({
  selector: 'app-creat-appartemet',
  templateUrl: './creat-appartemet.component.html',
  styleUrl: './creat-appartemet.component.css'
})
export class CreatAppartemetComponent implements OnInit,AfterViewInit{
  public dataSource!: MatTableDataSource<any>;

  public display:boolean = false;
  public submitted:boolean=false;


  displayImagesByCode: boolean=false;

  public displayedColumns = [
    "id","superficie","adresse","loyerMensuel", "ville","wifi","nmbrPersont","climatiseur","ref","photo","libelle","action"
  ];


  villes = villesMaroc;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;


  wifi :any;
  selectedAppartementItem: Appartement ={
    "id":0,
    "code":"",
    "superficie":0,
    "adresse":"",
    "loyerMensuel":0,
    "ville": "",
    "wifi": "",
    "nmbrPersont": 0,
    "climatiseur": "",
    images:[],
    categoriesAppartementDto :new CategoriesAppartement(),
    propAppartemenetDto: new AgenceAppartement()
  };

  isEdit :boolean=false;
  isCreate :boolean=false;
  protected categorie!: Array<CategoriesAppartement>;
  displaysucces: boolean = false;



  constructor(private sanitizer:DomSanitizer, protected appartemetService:AppartemetService, private categoriesAppartementService:CategoriesAppartementService, protected authService:AuthService) {
  }

  ngOnInit(): void {
    this.wifi=["oui","non"]
    this.getAllCategorie();
    this.viderItemSelected();
    this.getAll()
    console.log("==========================================")
    console.log(this.authService.dataUtilisateur)
    console.log("==========================================")
  }


  creatCategorie() {
    this.isCreate=true
    this.isEdit=false;
    this.viderItemSelected();
    this.item=this.selectedAppartementItem
    this.display = true;
  }

  fileDropped(fileHandle: FileHandle) {
    this.appartemetService.item.images.push(fileHandle);
  }

  prepareFormData(apartemet:Appartement):FormData{
    const  formData=new FormData();
    formData.append(
      'apartment'
      , new Blob(
        [JSON.stringify(apartemet)],
        {type:'application/json'}
      ));

    for (var i=0;i<apartemet.images.length;i++){
      formData.append(
        'imageFile',
        apartemet.images[i].file,
        apartemet.images[i].file.name
      );
    }
    return formData;
  }

  saveObject() {
    console.log(this.authService.dataUtilisateur)
    this.item.propAppartemenetDto.iceAgApp=this.authService.dataUtilisateur.iceAgApp
    this.save();
    this.submitted = true;
  }


  hideDialog() {
    this.viderItemSelected();
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


  editCategorie(element:Appartement) {
    this.isCreate=false;
    this.isEdit=true
    this.selectedAppartementItem = Object.assign({}, element);
    this.item=this.selectedAppartementItem
    this.display = true;
  }


  updateObject() {
    console.log("item prev :")
    console.log(this.selectedAppartementItem)
    console.log("item new :")
    console.log(this.item)

    this.item.images=this.selectedAppartementItem.images;
    this.item.propAppartemenetDto=this.selectedAppartementItem.propAppartemenetDto

    if(this.item.superficie==0){
      this.item.superficie=this.selectedAppartementItem.superficie;
    }
    if(this.item.adresse==""){
      this.item.adresse=this.selectedAppartementItem.adresse;
    }
    if(this.item.loyerMensuel==0){
      this.item.loyerMensuel=this.selectedAppartementItem.loyerMensuel;
    }
    if(this.item.ville==""){
      this.item.ville =this.selectedAppartementItem.ville;
    }
    if(this.item.wifi ==""){
      this.item.ville =this.selectedAppartementItem.wifi;
    }
    if(this.item.nmbrPersont ==0){
      this.item.nmbrPersont =this.selectedAppartementItem.nmbrPersont;
    }
    if(this.item.climatiseur ==""){
      this.item.climatiseur =this.selectedAppartementItem.climatiseur;
    }
    if(this.item.categoriesAppartementDto.libelle == ''){
      console.log("categoriesAppartement")
      this.item.categoriesAppartementDto=this.selectedAppartementItem.categoriesAppartementDto
    }
    this.update();
  }
  /***************************************************************************************************/
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
      this.appartemetService.item.images.push(fileHandle);
    }
  }



  removeImages(i:number) {
    this.appartemetService.item.images.splice(i,1);
  }

  /***************************************************************************************************/

  search(event: Event) {
    let value=(event.target as HTMLInputElement).value;
    this.dataSource.filter=value
  }

  //crud

  //1-save
  public save() {
    const  productFormData=this.prepareFormData(this.appartemetService.item);
    console.log("++!++")
    console.log(productFormData)
    console.log("appartemet item :")
    console.log(this.appartemetService.item)
    console.log("productFormData  :")
    console.log(productFormData)
    this.appartemetService.save(productFormData).subscribe({
      next: response => {
        console.log(response)
        if (response === -1) {
        } else if (response === -2) {
        } else if (response === -3) {
        } else if (response === 1) {
          this.display=false;

          setTimeout(() => {

            this.displaysucces = false;
          }, 3000);
          this.displaysucces = true;
          this.getAll();
        }
      },
      error: (err) => {
        console.log(err)
      }
    });
  }



  //2-getAll
  public getAll() {
    this.appartemetService.getAll().subscribe({
      next: data => {
        this.items = data
        this.dataSource=new MatTableDataSource(this.items);
        if(this.dataSource.paginator&&this.dataSource.sort){
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort;
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }


  public  delete(appatemet:any){
    this.appartemetService.delete(appatemet.code).subscribe({
      next:() => {
        let images=appatemet.imagePaths
        for(let i=0;i<images.length;i++){
          console.log(images[i])
          // this.removeFromCloudinary(images[i])
        }

        this.getAll();
      },
      error:(err: any) => {
        console.log(err)
      }
    })
  }



  public  categorits : CategoriesAppartement[]=[]

  public  categoriesString: string[]=[]

  public selectedCategory: string="";

  public  getCategoriesLibelle(){
    this.categoriesAppartementService.getAll().subscribe(
      {
        next:data=>{
          this.categorits=data
          this.categorits.map(c=>{
            this.categoriesString.push(c.libelle.toString())
          })
        }
      }
    )
  }

  public  update():any{
    this.item.code=this.selectedAppartementItem.code
    this.item.images=this.selectedAppartementItem.images
    console.log("data::::")
    console.log(this.item)
    console.log(this.selectedAppartementItem)
    return this.appartemetService.update(this.item).subscribe({
      next:data=>{
        if(data==1){
          this.getAll();
          this.display=false;
          console.log(data)
        }else {
          console.log(data)
        }

      },
      error:err => {
        console.log(err)
      }
    })
  }

  viderItemSelected(){
    this.selectedAppartementItem={
      "id":0,
      "code":"",
      "superficie":0,
      "adresse":"",
      "loyerMensuel":0,
      "ville": "",
      "wifi": "",
      "nmbrPersont": 0,
      "climatiseur": "",
      images:[],
      categoriesAppartementDto : new CategoriesAppartement(),
      propAppartemenetDto: new AgenceAppartement()
    }
  }

  getAllCategorie(){
    this.categoriesAppartementService.getAll().subscribe({
      next:(data)=>{this.categorie=data}})
  }


  get item(): Appartement {
    return this.appartemetService.item;
  }

  set item(value: Appartement) {
    this.appartemetService.item = value;
  }


  get items(): Array<Appartement> {
    return this.appartemetService._items;
  }

  set items(value: Array<Appartement>) {
    this.appartemetService._items = value;
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort=this.sort;
  }

  images:string[]=[]

  photoByCode(code:any) {
    this.images=code.imagePaths
    this.displayImagesByCode=true;
  }

  removeFromCloudinary(photo: string) {
    this.appartemetService.deleteImageCloudinary(photo)
  }
}
