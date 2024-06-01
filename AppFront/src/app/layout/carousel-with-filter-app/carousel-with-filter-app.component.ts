import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AppartemetService} from "../../sahred/service/appartemetService/appartemet.service";
import {Appartement} from "../../sahred/model/appartemetModel/appartement.model";
import {CategoriesAppartemet} from "../constant-app/villes-maroc.module";
import {CategoriesAppartementService} from "../../sahred/service/appartemetService/categories-appartement.service";

@Component({
  selector: 'app-carousel-with-filter-app',
  templateUrl: './carousel-with-filter-app.component.html',
  styleUrl: './carousel-with-filter-app.component.css'
})
export class CarouselWithFilterAPPComponent implements OnInit
{

  public listCategories:any[]=[]
  public display:boolean = false;
  public formatcard:boolean = false;
  public selected:boolean = true;
  h1Content: string = '';
  public dataApp:Array<Appartement>=new Array<Appartement>();
  // Utilisation de @ViewChild pour obtenir une référence à l'élément <div> avec la classe "info"
  @ViewChild('infoDiv', {static: false}) infoDiv!: ElementRef;
  constructor(private renderer: Renderer2, private el: ElementRef, private router:Router,private appService:AppartemetService,
              private categoriesService:CategoriesAppartementService
  )
  {
  }


  ngOnInit()
  {
    this.getAllaCategoriesApparatemet();
    this.initSlider();
  }

  getAllaCategoriesApparatemet(){
    console.log("######################")
    this.categoriesService.getAll().subscribe(
      {
         next:data=>{
           console.log(data)
           this.listCategories=data
         },
         error:err => {}
      }
    )
    console.log("######################")

  }
  initSlider()
  {
    const imageList = this.el.nativeElement.querySelector(".slider-wrapper .image-list");
    const slideButtons = this.el.nativeElement.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = this.el.nativeElement.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;


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

    this.appService.getAppartemetsbyLibelle(h1Element).subscribe({
      next:(data)=>{
        this.dataApp=data;
      }
    })

  }




  protected readonly HTMLElement = HTMLElement;

  returnUrl(appartemet: any):string {
    return appartemet.imagePaths[0]
  }

  returnUrlOne(categories: any):string {
    return categories.imagePaths
  }
}
