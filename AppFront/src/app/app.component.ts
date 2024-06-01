import {Component, OnInit} from '@angular/core';
import {AuthService} from "./security/serviceAuth/auth.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements  OnInit{
  title = 'AppFront';

  constructor(private authService :AuthService ,private translateService: TranslateService) {
  this.translateService.setDefaultLang('en');
}
SwitchLanguage(lang:string){
  this.translateService.use(lang) ;
}


  ngOnInit(): void {
    this.authService.loadJwtTokenFromLocalStrage();
  }

}
