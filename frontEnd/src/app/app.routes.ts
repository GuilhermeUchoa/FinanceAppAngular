import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { PortfolioDetalheComponent } from './pages/portfolio-detalhe/portfolio-detalhe.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './auth.guard';
import { LogoutComponent } from './pages/logout/logout.component';




export const routes: Routes = [

    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'portfolio',component:PortfolioComponent,canActivate:[authGuard]},
    {path:'portfolio/:id',component:PortfolioDetalheComponent,canActivate:[authGuard]},

    {path:'login',component:LoginComponent},
    {path:'logout',component:LogoutComponent},
    {path:'register',component:RegisterComponent},


];
