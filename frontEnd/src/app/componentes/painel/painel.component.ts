import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { PortfolioService } from '../../service/portfolioService/portfolio.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-painel',
  standalone: true,
  imports: [
    MatGridListModule,
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.css'
})
export class PainelComponent {

  total:number = 0
  acao:number = 0
  bdr:number = 0
  fii:number = 0
  rendaFixa:number = 0

  constructor(private _PortfolioService:PortfolioService){}

  ngOnInit(){

    this._PortfolioService.listarPortfolio().subscribe((data)=>{
      this.total = data.reduce((previousValue,currentValue) => previousValue + currentValue.valor,0)

      data.filter((ativo)=>{
        if (ativo.tipo == "acao"){
          this.acao += ativo.valor
        }
      })

      data.filter((ativo)=>{
        if (ativo.tipo == "bdr"){
          this.bdr += ativo.valor
        }
      })

      data.filter((ativo)=>{
        if (ativo.tipo == "fii"){
          this.fii += ativo.valor
        }
      })

      data.filter((ativo)=>{
        if (ativo.tipo == "rendaFixa"){
          this.rendaFixa += ativo.valor
        }
      })
      
    })

  }

}
