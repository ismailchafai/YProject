import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  private redirectUrl!: string;

  constructor(private router: Router) {}

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  redirectToStoredUrl(): void {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
      this.clearRedirectUrl();
    }
  }

  clearRedirectUrl(): void {
    // @ts-ignore
    this.redirectUrl= null;
  }
}
