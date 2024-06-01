import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CategorieVoitureService} from "../../../../sahred/service/voitureService/categorie-voiture.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {Contrat} from "../../../../sahred/model/communModel/contrat.model";
import {ContratService} from "../../../../sahred/service/communService/contrat.service";

@Component({
  selector: 'app-creat-contrat',
  templateUrl: './creat-contrat.component.html',
  styleUrl: './creat-contrat.component.css'
})
export class CreatContratComponent implements OnInit, AfterViewInit {

  public dataSource!: MatTableDataSource<any>;

  // variable and save dialoge update
  public display:boolean = false;
  public displaySave:boolean = false;
  public displayUpdate:boolean = false;
  contrat:any ;

  public submitted:boolean=false;


  public ListeColum = [
    "numContrat","prixHT","TVA","modelePaiement","dateSignature","dureeRetard","Rest","riflocation","action"
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private service:ContratService) {
  }



  ngOnInit(): void {
    this.getAll();

    console.log(this.dataSource)
  }



  ngAfterViewInit(): void {
    console.log("this.paginator"+this.paginator)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }



  public getAll(){
    this.service.getAll().subscribe({
      next:(data)=>{

        this.items=data;
        this.dataSource = new MatTableDataSource<any>(this.items);
        this.dataSource.paginator = this.paginator;
        if(data.length!=0){
          console.log("DATA"+data);
          console.log("this.items"+this.items);
        }
      },
      error:(err)=>{
        console.log('verifier getAll contrat');
      }
    })
  }

  saveObject() {
    this.service.save().subscribe({
      next:(data)=>{
        if(data==1){
          this.submitted = true;
          this.hideDialog()

          this.getAll();
        }
        else {
          console.log(data)
        }
      }
    })


  }


  search(event: Event) {
    let value=(event.target as HTMLInputElement).value;
    this.dataSource.filter=value;
  }


  // editProduct(item: Contrat) {
  //
  //   alert('pas de champ à modifier ');
  //   this.displayContrat = true ;
  // }

  protected readonly console = console;


  public  handlDelete(numContrat:number){
    this.service.delete(numContrat).subscribe({
      next:(data) => {

        if(data==1) this.getAll();
      },
      error:(err) => {
        console.log(err)
      }
    })
  }


  public get(numContrat:number){

    this.service.get(numContrat).subscribe({
      next:(data)=>{

        this.contrat=data;
        console.log(this.contrat)
      },
      error:(err)=>{
        console.log('verifier getByRef contrat');
      }
    })
  }


  hideDialog() {
    this.displayUpdate=false;
    this.displaySave = false
    this.displayDilog();
    this.submitted = false;
  }


  showDialog() {
    this.displaySave = true;
    this.displayUpdate=false ;
    this.displayDilog()
  }
  showUpdate(num:number) {
    this.get(num);
    this.displayUpdate = true;
    this.displaySave = false ;
    this.displayDilog()
  }
  displayDilog(){
    this.display = this.displayUpdate || this.displaySave;
  }
  update(){
    this.service.update(this.contrat).subscribe({
      next:(data)=>{
        if(data==1){
          this.hideDialog()
          this.getAll();
        }
        else{
          alert(data)
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }



  get item(): Contrat {
    return this.service.item ;
  }

  set item(value: Contrat) {
    this.service.item = value;
  }

  get items(): Array<Contrat> {
    return this.service.items;
  }

  set items(value: Array<Contrat>) {
    this.service.items = value;
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

}

