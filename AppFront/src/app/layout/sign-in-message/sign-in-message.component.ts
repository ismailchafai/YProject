import { Component } from '@angular/core';
import {AuthService} from "../../security/serviceAuth/auth.service";
import {Router, RouterLink} from "@angular/router";
import {RedirectService} from "../../sahred/service/LayoutService/RedirectService.service";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-sign-in-message',
  templateUrl: './sign-in-message.component.html',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule
  ],
  styleUrl: './sign-in-message.component.css'
})
export class SignInMessageComponent {



}


