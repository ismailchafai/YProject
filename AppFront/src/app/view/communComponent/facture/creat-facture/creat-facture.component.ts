import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {FactureService} from "../../../../sahred/service/communService/facture.service";
import {Facture} from "../../../../sahred/model/communModel/facture.model";

@Component({
  selector: 'app-creat-facture',
  templateUrl: './creat-facture.component.html',
  styleUrl: './creat-facture.component.css'
})
export class CreatFactureComponent implements OnInit, AfterViewInit {

  public dataSource!: MatTableDataSource<any>;

  // variable and save dialoge update
  public display:boolean = false;
  public displaySave:boolean = false;
  public displayUpdate:boolean = false;
  contrat:any ;

  public submitted:boolean=false;


  public ListeColum = [
    "ref","dateFacture","TVA","montantTotal","location","action"
  ];//,"paiementDto"

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private service:FactureService) {
  }



  ngOnInit(): void {
    this.getAll();

    console.log(this.dataSource)
  }



  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }


  public getAll(){
    this.service.getAll().subscribe({
      next:(data)=>{

        this.items=data;
        this.dataSource = new MatTableDataSource<any>(this.items);

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
          this.display=false;
          console.log(data)
          this.getAll()
        }
        else {
          console.log(data)
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })


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



  get item(): Facture {
    return this.service.item ;
  }

  set item(value: Facture) {
    this.service.item = value;
  }

  get items(): Array<Facture> {
    return this.service.items;
  }

  set items(value: Array<Facture>) {
    this.service.items = value;
  }

  editProduct(item: Facture) {

    alert('pas de champ à modifier ');
  }

  protected readonly console = console;


  public  handlDelete(ref:string){
    this.service.delete(ref).subscribe({
      next:(data) => {
        if(data==1) this.getAll();
      },
      error:(err) => {
        console.log(err)
      }
    })
  }






  public get(ref:string){

    this.service.get(ref).subscribe({
      next:(data)=>{
        console.log("data"+data.dateFacture +data.ref + data.paiementDto+data.montantTotal+data.location.ref)
        this.contrat=data;
        console.log("this.contrat"+this.contrat.dateFacture +this.contrat.ref + this.contrat.paiementDto+this.contrat.montantTotal+this.contrat.location.ref)
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
  showUpdate(ref:string) {
    this.get(ref);
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

}
