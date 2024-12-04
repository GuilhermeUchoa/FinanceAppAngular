import { Component } from '@angular/core';
import { AtivoDetalheComponent } from '../../componentes/ativo-detalhe/ativo-detalhe.component';

@Component({
  selector: 'app-portfolio-detalhe',
  standalone: true,
  imports: [
    AtivoDetalheComponent
  ],
  templateUrl: './portfolio-detalhe.component.html',
  styleUrl: './portfolio-detalhe.component.css'
})
export class PortfolioDetalheComponent {

}
