import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {ClientService} from "../../../../sahred/service/communService/client.service";
import {Client} from "../../../../sahred/model/communModel/client.model";
import {AgenceLocation} from "../../../../sahred/model/voitureModel/agence-location.model";
import {AgenceAppartement} from "../../../../sahred/model/appartemetModel/AgenceAppartement.model";
import {Reservation} from "../../../../sahred/model/communModel/reservation.model";

@Component({
  selector: 'app-creat-client',
  templateUrl: './creat-client.component.html',
  styleUrl: './creat-client.component.css'
})
export class CreatClientComponent implements OnInit, AfterViewInit {

  public dataSource!: MatTableDataSource<any>;
  public display:boolean = false;
  public submitted:boolean=false;

  public ListeColum = [
    "cin","prenom","nom","numTeleClient","email_Client","action"
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private service:ClientService) {
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
        console.log('verifier getAll  Client');
      }
    })
  }


  showDialog() {
    this.display = true;
  }

  saveObject() {
    this.service.save().subscribe({
      next:(data)=>{
        if(data==1){
          this.submitted = true;
          this.display=false;
          alert('ok')
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



  get item(): Client {
    return this.service.item ;
  }

  set item(value: Client) {
    this.service.item = value;
  }

  get items(): Array<Client> {
    return this.service.items;
  }

  set items(value: Array<Client>) {
    this.service.items = value;
  }

  editProduct(item: Client) {

    alert('pas de champ à modifier ');
  }

  protected readonly console = console;


  public  handlDelete(cin:string){
    this.service.delete(cin).subscribe({
      next:(data) => {
        this.getAll();
        if(data==1) alert('deleted')
      },
      error:err=> {
        console.log(err)
      }
    })
  }


}

