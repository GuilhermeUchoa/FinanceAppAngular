import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../service/authService/auth-service.service';



@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  isLoggedIn: boolean = false;

  constructor(
    private _AuthServiceService:AuthServiceService,
    private _Router:Router
  ){}

  ngOnInit(){
    this._AuthServiceService.hasLogin$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }


  logout(){

    this._AuthServiceService.logout()
    this._Router.navigate(['logout/'])
  }




  
}
