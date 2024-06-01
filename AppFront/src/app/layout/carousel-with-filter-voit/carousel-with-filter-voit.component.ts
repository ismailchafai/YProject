import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {VoitureService} from "../../sahred/service/voitureService/voiture.service";
import {Voiture} from "../../sahred/model/voitureModel/voiture.model";
import {CategorieVoitureService} from "../../sahred/service/voitureService/categorie-voiture.service";

@Component({
  selector: 'app-carousel-with-filter-voit',
  templateUrl: './carousel-with-filter-voit.component.html',
  styleUrl: './carousel-with-filter-voit.component.css'
})
export class CarouselWithFilterVOITComponent implements OnInit
{
  public display:boolean = false;
  public formatcard:boolean = false;
  public selected:boolean = true;
  h1Content: string = '';
  public dataVoiture:Array<Voiture>=new Array<Voiture>();
  public  categories:any[]=[]
  // Utilisation de @ViewChild pour obtenir une référence à l'élément <div> avec la classe "info"
  @ViewChild('infoDiv', {static: false}) infoDiv!: ElementRef;
  constructor(private renderer: Renderer2, private el: ElementRef, private router:Router,
              private voitureservice:VoitureService,private categoriesService:CategorieVoitureService
  )
  {
  }


  ngOnInit()
  {
    this.categoriesService.getAll().subscribe({
      next:data=>{
        this.categories=data
        console.log("slider a5ir haja::::")
        console.log(this.categories)},
      error:err => {console.log(err)}
    })

    this.initSlider();

//this. findByCategorievoiture();
  }
 /* findByCategorievoiture(){
    this.voitureservice.findVoitureByCategoriLibelle(this.h1Content).subscribe({
      next:(data)=>{
        this.dataVoiture=data;

      }
    })
  }
*/

  initSlider()
  {
    const imageList = this.el.nativeElement.querySelector(".slider-wrapper .image-list");
    const slideButtons = this.el.nativeElement.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = this.el.nativeElement.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // Gestion des événements et manipulation du DOM ici
    // Assurez-vous d'utiliser this.renderer pour manipuler le DOM au lieu de document

    // Gestion du clic sur le bouton de défilement
    slideButtons.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', () => {
        const direction = button.id === "prev-slide" ? -1 : 1;
        const scrollAmount = imageList.clientWidth * direction;
        imageList.scrollBy({left: scrollAmount, behavior: "smooth"});
      });
    });

    // Gestion du redimensionnement de la fenêtre
    this.renderer.listen(window, 'resize', () => {
      // Réinitialise le slider en cas de redimensionnement
      this.initSlider();
    });
  }

  RedirectToFacture()
  {
    this.display = true;
   // this.findByCategorievoiture();
  }

  handelVertical()
  {
    this.formatcard = false
  }
  handelHorizental()
  {
    this.formatcard = true;

  }

  getH1Content(h1Element:string) {


    this.voitureservice.findVoitureByCategoriLibelle(h1Element).subscribe({
      next:(data)=>{this.dataVoiture=data;}})
   this.h1Content = h1Element;
  console.log(this.h1Content);
  }



  protected readonly HTMLElement = HTMLElement;
}
