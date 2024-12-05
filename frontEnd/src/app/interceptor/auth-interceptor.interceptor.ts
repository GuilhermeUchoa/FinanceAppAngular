import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { AuthServiceService } from '../service/authService/auth-service.service';
import { inject } from '@angular/core';



export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  //Forma de injetar o AuthService e seus metodos 
  const authService = inject(AuthServiceService);

  //Captura o token
  const token = authService.getToken()

  //Criar um clone da requisicao com suas mudanças e entao usar o next para enviar para o proximo receptor
  if(token){
    const cloneRequest = req.clone({
      setHeaders:{'Authorization':`Bearer ${token}`}
    })

    return next(cloneRequest)
  }

  return next(req);
};
