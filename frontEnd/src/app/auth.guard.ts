import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './service/authService/auth-service.service';


export const authGuard: CanActivateFn = (route, state) => {

  const _AuthServiceService = inject(AuthServiceService);
  const _Router = inject(Router);
  let token = _AuthServiceService.getToken()

  if(token){
    return true;
  }else{
    alert('Usuario nao autorizado, realize o login !!!')
    _Router.navigate(['home/'])
    return false
  }

};
