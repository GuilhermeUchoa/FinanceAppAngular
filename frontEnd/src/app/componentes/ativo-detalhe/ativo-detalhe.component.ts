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
import { TabelaQualitativaComponent } from './tabela-qualitativa/tabela-qualitativa.component';

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
    TabelaQualitativaComponent,

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