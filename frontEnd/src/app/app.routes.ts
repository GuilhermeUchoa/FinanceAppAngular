import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { PortfolioDetalheComponent } from './pages/portfolio-detalhe/portfolio-detalhe.component';




export const routes: Routes = [

    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'portfolio',component:PortfolioComponent},
    {path:'portfolio/:id',component:PortfolioDetalheComponent}
    


];
