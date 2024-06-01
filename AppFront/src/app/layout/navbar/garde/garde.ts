import {CanActivateFn, Router} from "@angular/router";
import {AuthService} from "../../../security/serviceAuth/auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const rout = inject(Router)
  const tokenService = inject(AuthService);

  if (tokenService.isAuthService)
    return true
  else {
    rout.navigate(["login"]).then()
    return false
  }
}
