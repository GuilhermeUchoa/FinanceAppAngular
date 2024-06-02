import { Component } from '@angular/core';
import { PortfolioService } from '../../service/portfolioService/portfolio.service';
import { Portfolio } from '../../interface/portfolio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.css'
})
export class PainelComponent {

  portfolio: Portfolio[] = []
  valorTotalCarteira: number = 0
  valorTotalCarteiraACAO: number = 0
  valorTotalCarteiraFII: number = 0
  valorTotalCarteiraBDR: number = 0
  valorTotalCarteiraRENDAFIXA: number = 0

  constructor(private _PortfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.painelRequests()

  }

  painelRequests(): void {
    this._PortfolioService.listarCarteira().subscribe((response) => {
      this.portfolio = response

      this.valorTotalCarteira = this.portfolio.reduce((accumulator, currentValue) => accumulator + currentValue.valor, 0)

      //Total acao
      this.portfolio.map((f) => {
        if (f.tipo == 'acao') {
          this.valorTotalCarteiraACAO = this.valorTotalCarteiraACAO + (f.valor)
        }
      })


      //Total fii
      this.portfolio.map((f) => {
        if (f.tipo == 'fii') {
          this.valorTotalCarteiraFII = this.valorTotalCarteiraFII + (f.valor)
        }
      })


      //Total bdr
      this.portfolio.map((f) => {
        if (f.tipo == 'bdr') {
          this.valorTotalCarteiraBDR = this.valorTotalCarteiraBDR + (f.valor)
        }
      })


      //Total renda fixa
      this.portfolio.map((f) => {
        if (f.tipo == 'renda fixa') {
          this.valorTotalCarteiraRENDAFIXA = this.valorTotalCarteiraRENDAFIXA + (f.valor)
        }
      })

    })
  }

}
