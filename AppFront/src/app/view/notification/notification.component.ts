import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {CategorieVoitureService} from "../../sahred/service/voitureService/categorie-voiture.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {CategorieVoiture} from "../../sahred/model/voitureModel/categorie-voiture.model";
import {NotifiactionService} from "../../sahred/service/notificationService/notifiaction.service";
import {Notifiaction} from "../../sahred/model/notificationModel/notifiaction.model";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit, AfterViewInit {
public isEdit: boolean=false;
public isCreat: boolean=false;


public dataSource!: MatTableDataSource<any>;
public display:boolean = false;
public submitted:boolean=false;


public ListeColum = [
    "code","matriculeVoiture","cinClient","iceAgence","action"
  ];

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!:MatSort;

  constructor(private service:NotifiactionService) {
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

        if(data.length!=0){console.log(data); console.log(this.items)}
      },
      error:(err)=>{
        console.log('verifier getAll categorie Voiture');
      }
    })
  }






  showDialog() {
    this.display = true;
    this.isCreat=true;
    this.isEdit=false

  }

  saveObject() {
    this.service.save().subscribe({
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



  get item(): Notifiaction {
    return this.service.item ;
  }

  set item(value: Notifiaction) {
    this.service.item = value;
  }

  get items(): Array<Notifiaction> {
    return this.service.items;
  }

  set items(value: Array<Notifiaction>) {
    this.service.items = value;
  }





protected readonly console = console;


public  handlDelete(libelle:string){
    this.service.delete(libelle).subscribe({
      next:(data) => {
        this.getAll();
        if(data==1) alert('deleted')
      },
      error:(err) => {
        console.log(err)
      }
    })
  }




}

