import { Component } from '@angular/core';
import {AuthService} from "../../security/serviceAuth/auth.service";

@Component({
  selector: 'app-home-charts',
  templateUrl: './home-charts.component.html',
  styleUrl: './home-charts.component.css'
})
export class HomeChartsComponent {

  constructor(protected authService:AuthService) {
  }
}
