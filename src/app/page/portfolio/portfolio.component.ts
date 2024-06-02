import { Component } from '@angular/core';
import { TabelaComponent } from '../../componentes/tabela/tabela.component';
import { FileUploadComponent } from '../../componentes/file-upload/file-upload.component';
import { PainelComponent } from '../../componentes/painel/painel.component';


@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [TabelaComponent, FileUploadComponent, PainelComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {

}
