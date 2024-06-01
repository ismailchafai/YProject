import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CategoriesAppartement} from "../../../../sahred/model/appartemetModel/categories-appartement.model";
import {
  CategoriesAppartementService
} from "../../../../sahred/service/appartemetService/categories-appartement.service";
import { Appartement } from '../../../../sahred/model/appartemetModel/appartement.model';
import {AppartemetService} from "../../../../sahred/service/appartemetService/appartemet.service";
import {AuthService} from "../../../../security/serviceAuth/auth.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {VoitureService} from "../../../../sahred/service/voitureService/voiture.service";
import html2canvas from "html2canvas";
import {Voiture} from "../../../../sahred/model/voitureModel/voiture.model";
// @ts-ignore
import jsPDF from 'jspdf';
import {content} from "html2canvas/dist/types/css/property-descriptors/content";
import {response} from "express";
import {FileHandle} from "../../../../sahred/model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";
import { VillesMarocModule} from "../../../../layout/constant-app/villes-maroc.module";
import {CategoriesAppartemet} from "../../../../layout/constant-app/villes-maroc.module"

@Component({
  selector: 'app-creat-categories-appartement',
  templateUrl: './creat-categories-appartement.component.html',
  styleUrl: './creat-categories-appartement.component.css'
})
export class CreatCategoriesAppartementComponent implements OnInit ,AfterViewInit{
  public dataSource!: MatTableDataSource<any>;

  public display:boolean = false;
  public submitted:boolean=false;

  public  c:boolean=false;
  public  isKayna:boolean=false;

  public  image:any;


  public displayedColumns = [
    "id", "libelle","photo","action"
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;


  selectedCategorieItem: CategoriesAppartement =new CategoriesAppartement();

  isEdit :boolean=false;
  isCreate :boolean=false;
  public categoriesAppartemet: string[]=CategoriesAppartemet;

  displaysucces: boolean = false;



  constructor(private sanitizer:DomSanitizer,private categoriesAppartementService:CategoriesAppartementService) {
  }

  ngOnInit(): void {
    this.viderItemSelected();
    this.getAll()
  }


  creatCategorie() {
    this.isCreate=true
    this.isEdit=false;
    this.viderItemSelected();
    this.display = true;
  }

  saveObject() {
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


  editCategorie(element:CategoriesAppartement) {
    this.isCreate=false;
    this.isEdit=true
    this.selectedCategorieItem = Object.assign({}, element);
    this.display = true;
  }


  updateObject() {
    console.log(this.selectedCategorieItem)
    console.log(this.item)
    let data={
      "libelle": this.selectedCategorieItem.libelle,
      "libelleNew": this.item.libelle
    }
    this.categoriesAppartementService.update(data).subscribe({
      next:data=>{
        console.log(data)
        if(data==1){
          this.getAll();
          this.display=false;
        }else {
          console.log("error")
        }

      },
      error:err => {
        console.log(data)
      }
    })

  }

  search(event: Event) {
    console.log(event)
    let value=(event.target as HTMLInputElement).value;
    this.dataSource.filter=value
  }


  //crud

  //1-save
  public save() {
    const formData=this.prepareFormData(this.item);
    this.categoriesAppartementService.save(formData).subscribe({
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
  prepareFormData(categories:CategoriesAppartement){
    const formData=new FormData();
    formData.append(
      'categoriesAppartemet',
      new Blob([JSON.stringify(categories)]
        ,{type:'application/json'}))

    formData.append(
      'photo',
      categories.images.file,
      categories.images.file.name
      )
    return formData;
  }


  //2-getAll
  public getAll() {
    this.categoriesAppartementService.getAll().subscribe({
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


  public  delete(libelle:String){
    this.categoriesAppartementService.delete(libelle).subscribe({
      next:() => {
        this.getAll();
      },
      error:(err: any) => {
        console.log(err)
      }
    })
  }


  viderItemSelected(){
    this.selectedCategorieItem=new CategoriesAppartement();
  }




  get item(): CategoriesAppartement {
    return this.categoriesAppartementService.item;
  }

  set item(value: CategoriesAppartement) {
    this.categoriesAppartementService.item = value;
  }


  get items(): Array<CategoriesAppartement> {
    return this.categoriesAppartementService._items;
  }

  set items(value: Array<CategoriesAppartement>) {
    this.categoriesAppartementService._items = value;
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator= this.paginator;
    // this.dataSource.sort=this.sort;
  }


  protected readonly event = event;
  isVisible: boolean=false;

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
      this.item.images=fileHandle
      this.isKayna=true
    }
  }

  fileDropped(fileHandle: FileHandle) {
    this.item.images=fileHandle;
    this.isKayna=true
  }

  removeImages() {
  }

  photoByCode(element:any) {
    this.image=element.imagePaths
    this.isVisible=true
  }
}
