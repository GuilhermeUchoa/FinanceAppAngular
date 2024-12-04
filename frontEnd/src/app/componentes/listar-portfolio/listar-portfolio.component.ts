import { CommonModule, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { PortfolioService } from '../../service/portfolioService/portfolio.service';
import { Portfolio } from '../../interface/portfolio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-listar-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    DecimalPipe,
  ],
  templateUrl: './listar-portfolio.component.html',
  styleUrl: './listar-portfolio.component.css'
})
export class ListarPortfolioComponent {

  portfolio: Portfolio[] = []
  quantidadeTotalCarteira: number = 0
  valorTotalCarteira: number = 0
  porcentagemTotalCarteira: number = 0
  metaTotalCarteira: number = 0
  valorTotalAporte: number = 0
  variacaoAnualTotalDaCarteira: number = 0
  valorTotalemReaisParaMeta : any = 0

  constructor(
    private _PortfolioService: PortfolioService,
    private _Router: Router,

  ) { }

  // As funcoes são criadas na ordem da tabela

  ngOnInit(): void {
    //Init
    this.listarPortfolio()
  }

  listarPortfolio(): void {
    //Listar carteira em ordem por tipo de ativo
    this._PortfolioService.listarPortfolio().subscribe((data) => {
      this.portfolio = data.sort((a, b) => {
        if (a.tipo < b.tipo) return -1;
        if (a.tipo > b.tipo) return 1;
        return 0;
      });

      //Quantidade Total
      this.quantidadeTotal()
      //Valor Total
      this.valorTotal()
      //Porcentagem de cada ativo
      this.porcentagemDeCadaAtivo()
      //Porcentagem Total
      this.porcentagemTotal()
      //metaTotalCarteira ao iniciar o programa
      this.metaTotalCarteira = data.reduce((previousValue, currentValue) => previousValue + currentValue.meta, 0)
      //VaricaoAnulDaCarteira
      this.variacaoAnualCarteira()
      //ValorTotalParaMeta Em reais
      this.ValorTotalParaMeta()

    })
  }

  atualizarComentario(event: any, id: any): void {
    //Atualizar Comentario
    this._PortfolioService.getAtivo(id).subscribe((data) => {
      let portfolio = data
      portfolio.comentarios = event.target.value
      this._PortfolioService.atualizarAtivo(id, portfolio).subscribe()
    })

  }

  quantidadeTotal(): void {
    this.quantidadeTotalCarteira = this.portfolio.reduce((previousValue, currentValue) => previousValue + currentValue.quantidade, 0)
  }

  valorTotal(): void {
    this.valorTotalCarteira = this.portfolio.reduce((previousValue, currentValue) => previousValue + currentValue.valor, 0)
  }

  variacaoAnualCarteira(): void {
    this.variacaoAnualTotalDaCarteira = this.portfolio.reduce((previousValue, currentValue) => previousValue + currentValue.variacaoAnual, 0)
  }

  porcentagemTotal(): void {
    this.porcentagemTotalCarteira = this.portfolio.reduce((previousValue, currentValue) => previousValue + currentValue.porcentagem, 0)
  }
  
  //Meio que inutil isso aqui dps eu tiro
  ValorTotalParaMeta(){
    // no caso da estrategia de sempre comprar, quantos reais voce precisa para estabilizar a carteira hoje?
    // Essa funcao tenta resolver isso
    this.portfolio.forEach((data)=>{
      if(data.porcentagem < (data.meta/100)){

        this.valorTotalemReaisParaMeta += (((data.meta/100)-data.porcentagem) * this.valorTotalCarteira)
      }
    })

  }

  atualizarMeta(event: any, id: any): void {
    //Atualiza na api a meta de um ativo individual
    this._PortfolioService.getAtivo(id).subscribe((data) => {
      let portfolio = data
      portfolio.meta = event.target.value
      this._PortfolioService.atualizarAtivo(id, portfolio).subscribe()

      //Atualizar metaTotalCarteira a cada atualizacao de meta, substuindo this.portifolio.meta atual, do ativo especifico, pelo event.target.value
      this.portfolio.filter((data) => {
        if (data.id == id) {
          data.meta = parseFloat(event.target.value)
          this.metaTotalCarteira = this.portfolio.reduce((accumulator, currentValue) => accumulator + currentValue.meta, 0)
        }

      })

    })

  }

  atualizarStatus(event: any, id: any): void {
    //Atualizar status para api
    this._PortfolioService.getAtivo(id).subscribe((response) => {

      let ativo = response
      if (event.target.value == 1) {
        ativo.status = 'comprar';

      } if (event.target.value == 2) {
        ativo.status = 'aguardar'

      } if (event.target.value == 3) {
        ativo.status = 'vender'

      }

      //Muda a cor de forma iterativa
      this.portfolio.filter((x) => { x.id == id ? x.status = ativo.status : "" })

      this._PortfolioService.atualizarAtivo(id, ativo).subscribe()

    })
  }


  calculoCotas(event: any, id: any): void {
    //Calculo Cotas e aporte
    this.portfolio.filter((data) => {
      if (data.id == id) {
        data.valor = (data.cotacao * (data.quantidade + parseInt(event.target.value)))
        data.aporte = data.cotacao * parseInt(event.target.value)


        //Calcular o valor total do aporte
        this.valorTotalAporte = this.portfolio.reduce((accumulator, currentValue) => accumulator + currentValue.aporte, 0)
        this.valorTotal()

        //Porcentagem de cada ativo
        this.porcentagemDeCadaAtivo()
      }
    })
  }

  porcentagemDeCadaAtivo(): void {
    //Porcentagem dos ativos
    this.portfolio.forEach((data) => {
      data.porcentagem = data.valor / this.valorTotalCarteira
    })
  }

  searchTermAtivo = false
  searchTerm(event: any): void {

    //Buscador
    let word: string = (event.target.value).toLowerCase()

    if (word != "") {
      this.searchTermAtivo = true
    } else {
      this.searchTermAtivo = false
    }

    this._PortfolioService.searchApi(word).subscribe((data) => {
      this.portfolio = data

      //Quantidade Total
      this.quantidadeTotal()
      //Valor Total
      this.valorTotal()
      //Porcentagem de cada ativo
      this.porcentagemDeCadaAtivo()
      //Porcentagem Total
      this.porcentagemTotal()
      //metaTotalCarteira ao iniciar o programa
      this.metaTotalCarteira = data.reduce((previousValue, currentValue) => previousValue + currentValue.meta, 0)
      //VariacaoAnual
      this.variacaoAnualCarteira()


    })


  }
  atualizandoCotacao = false
  atualizarCotacoesDaCarteira(): void {
    // Atualiza cotacoes
    this.atualizandoCotacao = true
    this._PortfolioService.atualizarCotacao().subscribe((data) => {
      console.log(data)
      window.location.reload()

    })
    
  }

  atualizandoFile = false
  fileB3(event: any): void {
    this.atualizandoFile = true
    let file: any = event.target.files.item(0)
    if (file) {
      this._PortfolioService.uploadFile(file).subscribe((data) => {
        console.log(data)
        window.location.reload()
      }, (error) => { console.log(error) })
    }
  }


  //PrecoMedio save
  precoMedio(event: any, id: any) {
    this._PortfolioService.getAtivo(id).subscribe((data) => {
      let portfolio = data
      data.precoMedio = event.target.value

      this._PortfolioService.atualizarAtivo(id, portfolio).subscribe()
    })
  }

  //Valuation save
  valuation(event: any, id: any) {
    this._PortfolioService.getAtivo(id).subscribe((data) => {
      let portfolio = data
      data.valuationDFC = event.target.value
      this._PortfolioService.atualizarAtivo(id, portfolio).subscribe()
    })
  }

}
