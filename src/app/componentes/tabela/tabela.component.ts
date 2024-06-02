import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { PortfolioService } from '../../service/portfolioService/portfolio.service';
import { Portfolio } from '../../interface/portfolio';
import { FormsModule } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.css'
})
export class TabelaComponent {

  portfolio: Portfolio[] = []
  valorTotalCarteira: number = 0
  metaTotalCarteira: number = 0

  constructor(
    private _PortfolioService: PortfolioService,
    private _snackBar: MatSnackBar,
    private _ElementRef: ElementRef,
    private _Router: Router
  ) { }

  ngOnInit(): void {
    this.listarCarteira()
  }

  // Listar carteira
  listarCarteira(): void {
    this._PortfolioService.listarCarteira().subscribe((response) => {
      this.portfolio = response
      this.portfolio
      //Maneira de somar valores totais
      this.valorTotalCarteira = this.portfolio.reduce((accumulator, currentValue) => accumulator + currentValue.valor, 0)
      this.atualizarMetaTotal()
    })
  }

  //Atualizar meta
  atualizarMeta(event: any, id: any): void {
    let ativo: any
    this._PortfolioService.getAtivo(id).subscribe((response) => {
      ativo = response
      ativo.meta = parseFloat(event.target.value)
      this._PortfolioService.atualizarAtivo(id, ativo).subscribe()
      this.openSnackBar(`${ativo.ativo} - Meta atualizada !!!`)
      this.atualizarMetaTotal()
      
    })
  }
  //Funcao meta total
  atualizarMetaTotal(): void {
    this._PortfolioService.listarCarteira().subscribe((response) => {
      this.metaTotalCarteira = response.reduce((accumulator, currentValue) => accumulator + currentValue.meta, 0)
    })
  }

  //Atualizar status
  atualizarStatus(event: any, id: any): void {
    let ativo: any
    this._PortfolioService.getAtivo(id).subscribe((response) => {
      ativo = response
      if (event.target.value == 1) {
        ativo.status = 'comprar';
      } if (event.target.value == 2) {
        ativo.status = 'aguardar'
      } if (event.target.value == 3) {
        ativo.status = 'vender'
      }
      
      this._PortfolioService.atualizarAtivo(id, ativo).subscribe()
      this.openSnackBar(`${ativo.ativo} - Status atualizado !!!`)
      window.location.reload()
    })
  }

  //Atualizar comentario
  atualizarComentario(event: any, id: any): void {
    let ativo: any
    this._PortfolioService.getAtivo(id).subscribe((response) => {
      ativo = response
      ativo.comentarios = event.target.value
      this._PortfolioService.atualizarAtivo(id, ativo).subscribe()
      this.openSnackBar(`${ativo.ativo} - Comentario atualizado !!!`)
    })
  }

  // Mensagem Box
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 5;
  openSnackBar(mensagem: string) {
    this._snackBar.open(mensagem, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,

    });
  }

  //CalculoGeral
  calculoGeral(event: any): void {

    //Aporte individual
    let tr = event.target.parentElement.parentElement.parentElement
    let aporte = tr.getElementsByTagName('td')[9]
    let cota = event.target.value
    let cotacao = parseFloat(tr.getElementsByTagName('td')[2].innerText.replace('R$', ''))

    aporte.innerHTML = (cota * cotacao).toFixed(2)

    //Aporte total
    let aporteTotal: any = document.querySelector("#aporteValorTotal")
    let _arrayAportes = document.getElementsByClassName('aporte')
    let acumulador = 0
    let incrementador = 0
    for (let i = 0; i < _arrayAportes.length; i++) {
      incrementador = parseFloat(_arrayAportes[i].innerHTML)
      acumulador = acumulador + incrementador
    }
    aporteTotal.innerHTML = `R$ ${acumulador.toFixed(2)}`

    //valor ta errado
    let valor = tr.getElementsByTagName('td')[4]
    valor.innerHTML = (parseFloat(aporte.innerHTML) + parseFloat(valor.innerHTML.replace("R$", "")))

  }

}

