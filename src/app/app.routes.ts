import { Routes } from '@angular/router';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { ListarPortfolioComponent } from './componentes/portfolio/listar-portfolio/listar-portfolio.component';



export const routes: Routes = [

    {path:'',component:PortfolioComponent, children:[
        {path:'',component:ListarPortfolioComponent},
    ]}
];
