import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot , Router} from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
  ) => {
    console.log("Islogged from guard",inject(AuthService).isLoggedIn)
  if (inject(AuthService).isLoggedIn) {
    
    return true;
  } else {
    console.log("Not")
    inject(Router).navigate(['/login']);
    return false;
  }
  
};
