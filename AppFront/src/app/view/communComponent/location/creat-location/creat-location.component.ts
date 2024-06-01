import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {LocationService} from "../../../../sahred/service/communService/location.service";
import {Location} from "../../../../sahred/model/communModel/location.model";

@Component({
  selector: 'app-creat-location',
  templateUrl: './creat-location.component.html',
  styleUrl: './creat-location.component.css'
})
export class CreatLocationComponent implements OnInit, AfterViewInit {

  public dataSource!: MatTableDataSource<any>;
  public submitted:boolean=false;

  // variable and save dialoge update
  public display:boolean = false;
  public displaySave:boolean = false;
  public displayUpdate:boolean = false;
  contrat:any ;

  public ListeColum = [
    "ref","dateDebut","datefine","action"
    // "ref","reservationDto","action"
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private service:LocationService) {
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
        }
        else {
          console.log(data)
        }
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

  get item(): Location {
    return this.service.item ;
  }

  set item(value: Location) {
    this.service.item = value;
  }

  get items(): Array<Location> {
    return this.service.items;
  }

  set items(value: Array<Location>) {
    this.service.items = value;
  }

  editProduct(item: Location) {

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
        console.log("data"+data.ref)
        this.contrat=data;
        console.log("this.contrat"+this.contrat.dateFacture)
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
