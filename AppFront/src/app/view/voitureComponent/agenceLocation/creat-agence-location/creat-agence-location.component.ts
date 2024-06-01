import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AgenceLocationService} from "../../../../sahred/service/voitureService/agence-location.service";
import jsPDF from "jspdf";
import {AgenceLocation} from "../../../../sahred/model/voitureModel/agence-location.model";

@Component({
  selector: 'app-creat-agence-location',
  templateUrl: './creat-agence-location.component.html',
  styleUrl: './creat-agence-location.component.css'
})
export class CreatAgenceLocationComponent implements OnInit, AfterViewInit {

  public dataSource!: MatTableDataSource<any>;
  public display: boolean = false;
  public submitted: boolean = false;


  public ListeColum = [
    "iceAgLoc", "raisonSocialAg", "adresse", "numTelephone", "numCompteBkAgLoc", "RCAgLoc", "ribAgenceLoc", "action"
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: AgenceLocationService) {
  }


  ngOnInit(): void {
    this.getAll();

    console.log(this.dataSource)
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  public getAll() {
    this.service.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.items = data;
        this.dataSource = new MatTableDataSource<any>(this.items);

        if (data.length != 0) {
          console.log(data);
          console.log(this.items)
        }
      },
      error: (err) => {
        console.log('verifier getAll Agence de Location');
        console.error(err);
      }
    })
  }


  showDialog() {
    this.display = true;
  }

  saveObject() {
    this.service.save().subscribe({
      next: (data) => {
        if (data == 1) {
          this.submitted = true;
          this.display = false;
          alert('ok')
        } else {
          console.log(data)
        }
      }
    })


  }


  hideDialog() {
    this.display = false;
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
    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }


  get item(): AgenceLocation {
    return this.service.item;
  }

  set item(value: AgenceLocation) {
    this.service.item = value;
  }

  get items(): Array<AgenceLocation> {
    return this.service.items;
  }

  set items(value: Array<AgenceLocation>) {
    this.service.items = value;
  }

  editProduct(item: AgenceLocation) {

    alert('pas de champ à modifier ');
  }

  protected readonly console = console;


  public handlDelete(iceAgLoc: number) {
    this.service.delete(iceAgLoc).subscribe({
      next: (data) => {
        this.getAll();
        if (data == 1) alert('deleted')
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


}
