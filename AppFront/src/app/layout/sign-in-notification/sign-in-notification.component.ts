import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../security/serviceAuth/auth.service";
import {RedirectService} from "../../sahred/service/LayoutService/RedirectService.service";

@Component({
  selector: 'app-sign-in-notification',
  templateUrl: './sign-in-notification.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrl: './sign-in-notification.component.css'
})
export class SignInNotificationComponent {



}
