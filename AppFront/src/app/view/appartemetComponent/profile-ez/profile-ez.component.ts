import { Component } from '@angular/core';
import {AuthService} from "../../../security/serviceAuth/auth.service";

@Component({
  selector: 'app-profile-ez',
  templateUrl: './profile-ez.component.html',
  styleUrl: './profile-ez.component.css'
})
export class ProfileEzComponent {

  constructor(protected authService:AuthService) {

  }
}
