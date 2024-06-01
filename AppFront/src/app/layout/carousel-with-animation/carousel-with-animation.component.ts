import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Voiture} from "../../sahred/model/voitureModel/voiture.model";
import {CategoriesAppartement} from "../../sahred/model/appartemetModel/categories-appartement.model";
import {Appartement} from "../../sahred/model/appartemetModel/appartement.model";
import {VoitureService} from "../../sahred/service/voitureService/voiture.service";
import {CategoriesAppartementService} from "../../sahred/service/appartemetService/categories-appartement.service";
import {AppartemetService} from "../../sahred/service/appartemetService/appartemet.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-carousel-with-animation',
  templateUrl: './carousel-with-animation.component.html',
  styleUrl: './carousel-with-animation.component.css'
})
export class CarouselWithAnimationComponent implements OnInit{

  //carousel

  nextDom!: HTMLElement;
  prevDom!: HTMLElement;
  carouselDom!: HTMLElement;
  sliderDom!: HTMLElement;
  thumbnailBorderDom!: HTMLElement;
  thumbnailItemsDom!: NodeListOf<HTMLElement>;
  timeDom!: HTMLElement;
  timeRunning: number = 3000;
  timeAutoNext: number = 7000;
  runTimeOut!: ReturnType<typeof setTimeout>;
  runNextAuto!: ReturnType<typeof setTimeout>;
  datVoiture :Array<Voiture>=new Array<Voiture>();
  public allAppartement: any[]=[];



  constructor(private voitureService:VoitureService , private categoreieappartemetService:CategoriesAppartementService ,
              private apartement:AppartemetService,private router:Router,private renderer: Renderer2, private el: ElementRef) {
  }


  ngOnInit(): void {
  this.getAllVoiture();
  this.getAllAppartement();
    this.nextDom = document.getElementById('next') as HTMLElement;
    this.prevDom = document.getElementById('prev') as HTMLElement;
    this.carouselDom = document.querySelector('.carousel') as HTMLElement;
    this.sliderDom = this.carouselDom.querySelector('.carousel .list') as HTMLElement;
    this.thumbnailBorderDom = document.querySelector('.carousel .thumbnail') as HTMLElement;
    this.thumbnailItemsDom = this.thumbnailBorderDom.querySelectorAll('.item') as NodeListOf<HTMLElement>;
    this.timeDom = document.querySelector('.carousel .time') as HTMLElement;

    this.thumbnailBorderDom.appendChild(this.thumbnailItemsDom[0]);

    this.nextDom.onclick = () => {
      this.showSlider('next');
    };

    this.prevDom.onclick = () => {
      this.showSlider('prev');
    };

    this.runNextAuto = setTimeout(() => {
      this.nextDom.click();
    }, this.timeAutoNext);
    this.initSlider();
  }






  showSlider(type: string): void {
    const sliderItemsDom = this.sliderDom.querySelectorAll('.carousel .list .item') as NodeListOf<HTMLElement>;
    const thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item') as NodeListOf<HTMLElement>;

    if (type === 'next') {
      this.sliderDom.appendChild(sliderItemsDom[0]);
      this.thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
      this.carouselDom.classList.add('next');
    } else {
      this.sliderDom.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
      this.thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
      this.carouselDom.classList.add('prev');
    }

    clearTimeout(this.runTimeOut);
    this.runTimeOut = setTimeout(() => {
      this.carouselDom.classList.remove('next');
      this.carouselDom.classList.remove('prev');
    }, this.timeRunning);

    clearTimeout(this.runNextAuto);
    this.runNextAuto = setTimeout(() => {
      this.nextDom.click();
    }, this.timeAutoNext);
  }


  redirectVersLogin() {
    this.router.navigateByUrl("/login");
  }


  initSlider() {
    const imageList = this.el.nativeElement.querySelector(".slider-wrapper .image-list");
    const slideButtons = this.el.nativeElement.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = this.el.nativeElement.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // Gestion des événements et manipulation du DOM ici
    // Assurez-vous d'utiliser this.renderer pour manipuler le DOM au lieu de document

    // Gestion du clic sur le bouton de défilement
    slideButtons.forEach((button: HTMLElement) =>{
      this.renderer.listen(button, 'click', () => {
        const direction = button.id === "prev-slide" ? -1 : 1;
        const scrollAmount = imageList.clientWidth * direction;
        imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
    });

    // Gestion du redimensionnement de la fenêtre
    this.renderer.listen(window, 'resize', () => {
      // Réinitialise le slider en cas de redimensionnement
      this.initSlider();
    });
  }


  RedirectToFacture() {
    this.router.navigateByUrl("/reservationInformation");
  }


  getAllVoiture(){
    this.voitureService.getAll().subscribe(
      {
        next:(data)=>{
          this.datVoiture=data;
        }
      }
    )
  }


  getAllAppartement(){
    this.apartement.getAll().subscribe({
      next:data=>{
        this.allAppartement=data;
      },
      error:err => {console.log("error")}
    })
  }

  returnUrl(item: any) {
    return  item.imagePaths[0]
  }
}
