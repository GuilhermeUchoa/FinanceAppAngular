import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { PortfolioComponent } from './page/portfolio/portfolio.component';
import { ReceitasDespesasComponent } from './page/receitas-despesas/receitas-despesas.component';


export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'portfolio', component:PortfolioComponent},
    {path:'receitasdespesas', component:ReceitasDespesasComponent}
];
