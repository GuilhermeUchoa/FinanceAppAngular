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
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    MatButtonModule,
    MatCheckboxModule,

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
    public dialog: MatDialog,
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

    this.openDialog('0ms', '0ms')
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

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


  avaliacaoQualitativa: any = [
    { "texto": "Tem imoveis bem localizados ?", "valor": 1 },
    { "texto": "Tem bom gestor ?", "valor": 3.5 },
    { "texto": "Os imoveis são novos e estão em boas condições ?", "valor": 1 },
    { "texto": "Tem baixa vacancia historica (em relação ao seu setor)", "valor": 2 },
    { "texto": "Os inquilinos são bons ?", "valor": 1 },
    { "texto": "Tem diversificação interna ?", "valor": 2 },
    { "texto": "Tem bom histórico de distribuição de proventos ?", "valor": 1 },
    { "texto": "Apresenta características de perpetuidade ?", "valor": 1.5 },
    { "texto": "É irreplicavel em sua região e em seu setor ?", "valor": 0.5 },
    { "texto": "Os imóveis do fundo são versáteis (multi-uso) ?", "valor": 0.5 },
    { "texto": "O fundo apresenta alavancagem expressiva ?", "valor": -1.5 },

  ]

  // Tabela de score qualitativa
  scoreQualitativo(event: any, valor: number) {
    
    let question = event.source.id.split("-")[1]
    let answer = parseFloat(event.source.id.split("-")[2])
    console.log(question)
    console.log(answer)

    if (event.checked) {
      this.ativo.scoreQualitativo += valor //melhorar essa logica aqui, esta dando erro
      this.ativo[`question${question}`] = answer
      

    } else {
      this.ativo.scoreQualitativo -= valor //melhorar essa logica aqui, esta dando erro
      this.ativo[`question${question}`] = 0
    }
 

    this._ActivatedRoute.paramMap.subscribe((params) => {
      this._PortfolioService.atualizarAtivo(params.get('id'), this.ativo).subscribe()
      
    })

  }

  zerarScore(){
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.ativo.scoreQualitativo = 0
      this._PortfolioService.atualizarAtivo(params.get('id'), this.ativo).subscribe()
      
    })
  }

}


@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) { }
}