import { Component } from '@angular/core';
import { PortfolioService } from '../../service/portfolioService/portfolio.service';
import { ActivatedRoute } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-ativo-detalhe',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    CommonModule,
    HttpClientModule,
    AngularEditorModule,
    FormsModule,
  ],
  templateUrl: './ativo-detalhe.component.html',
  styleUrl: './ativo-detalhe.component.css'
})
export class AtivoDetalheComponent {

  ativoId: string = ''
  ativo: any = []

  constructor(
    private _PortfolioService: PortfolioService,
    private _ActivatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      let ativoId = params.get('id')

      this._PortfolioService.getAtivo(ativoId).subscribe((data) => {
        this.ativo = data
      })
    })
  }

  salvarAnotacoes() {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      let ativoId = params.get('id')
      this._PortfolioService.atualizarAtivo(ativoId, this.ativo).subscribe()
    })

    alert('Seu Texto foi salvo')
  }



  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '830px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: this.ativo.comentarios,
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    
  }


}
