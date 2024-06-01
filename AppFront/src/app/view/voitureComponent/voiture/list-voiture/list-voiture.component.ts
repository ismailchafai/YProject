import {AfterViewInit, Component, NgModule, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import {Voiture} from "../../../../sahred/model/voitureModel/voiture.model";
import {VoitureService} from "../../../../sahred/service/voitureService/voiture.service";


@Component({
  selector: 'app-list-voiture',
  templateUrl: './list-voiture.component.html',
  styleUrls: ['./list-voiture.component.css']
})
export class ListVoitureComponent implements OnInit, AfterViewInit {

  public voitures: any[] = []; // Renommé "voiture" en "voitures"
  public dataSource!: MatTableDataSource<any>;
  public display:boolean = false;
  public submitted:boolean=false;



  public ListeColum = [
    "id", "model", "matricule","action"
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private service:VoitureService) {
  }

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.voitures.push({
        id: i,
        model: Math.random().toString(20),
        matricule: Math.random().toString(30),

      });
    }
    this.dataSource = new MatTableDataSource<any>(this.voitures);
  }



  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }

  showDialog() {
    this.display = true;
  }

  saveObject() {
    this.submitted = true;
    this.display=false;

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

  editProduct(product: Voiture) {
    // @ts-ignore
    this.voitures = {...product};
    this.display = true;
  }


  search(event: Event) {
    let value=(event.target as HTMLInputElement).value;
    this.dataSource.filter=value;
  }
}
