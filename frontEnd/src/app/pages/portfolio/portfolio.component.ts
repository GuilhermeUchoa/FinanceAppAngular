import { Component } from '@angular/core';
import { ListarPortfolioComponent } from '../../componentes/listar-portfolio/listar-portfolio.component';
import { PainelComponent } from '../../componentes/painel/painel.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    ListarPortfolioComponent,
    PainelComponent,
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {

}
