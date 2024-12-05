import { Component, viewChild } from '@angular/core';
import { AuthServiceService } from '../../service/authService/auth-service.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavBarComponent } from '../../componentes/nav-bar/nav-bar.component';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario: string = ''
  senha: string = ''
  alerta: string = ''

  constructor(
    private _AuthServiceService: AuthServiceService,
    private _Router:Router,
    
  ) { }

  ngOnInit() { }

  login() {

    this._AuthServiceService.login(this.usuario, this.senha).subscribe(
      (data) => {
        if (data && data['access']) {
          this._AuthServiceService.storeToken(data['access'])
          console.log('Login bem sucedido')
          this._Router.navigate(['portfolio/'])
          
        }

      }, (error) => {
        this.alerta = 'Usuário ou senha incorreta'
        console.log('Usuário ou senha incorreta')
      }
    )
  }

}
