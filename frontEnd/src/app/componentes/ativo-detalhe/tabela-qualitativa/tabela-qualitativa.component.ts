import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { PortfolioService } from '../../../service/portfolioService/portfolio.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tabela-qualitativa',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatCardModule

  ],
  templateUrl: './tabela-qualitativa.component.html',
  styleUrl: './tabela-qualitativa.component.css'
})
export class TabelaQualitativaComponent {

  @Input() ativoId: string = ''
  @Input() ativo: any = []

  constructor(
    private _PortfolioService: PortfolioService,
    private _ActivatedRoute: ActivatedRoute,
  ) { }


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
  scoreQualitativo(event: any, resposta: number) {

    // Coordenadas através do id
    let linha = event.source.id.split("-")[0]
    let coluna = event.source.id.split("-")[1]

    // Resposta
    let _resposta = resposta

    if (event.source.checked) {
      let valorAnterior = this.ativo[`question${linha}`] //pega o valor anterior da linha para reduzir caso voce tenha clicado na mesma linha varias vezes e nao contabilizar a mesma linha

 
      this.ativo[`question${linha}`] = _resposta //recebe o valor da linha a qual voce clicou

      this.ativo.scoreQualitativo -= valorAnterior // reduz o valor anterior score
      this.ativo.scoreQualitativo += _resposta // adiciona o valor novo ao score

    } else {
      // ainda tem bug quando voce desclica, nao esta salvando, e se voce desclicar e clicar o valor fica negativo
      this.ativo.scoreQualitativo -= _resposta 
    }

    // Salvar na api
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this._PortfolioService.atualizarAtivo(params.get('id'), this.ativo).subscribe()

    })

  }

  zerarScore() {
    // Forma nao elegantede zerar o score bugado
    this._ActivatedRoute.paramMap.subscribe((params) => {


      //zerando cada comentario
      for (let index = 0; index < 12; index++) {
        this.ativo[`question${index}`] = 0
      }
      
      this.ativo.scoreQualitativo = 0
      this._PortfolioService.atualizarAtivo(params.get('id'), this.ativo).subscribe()
      console.log(this.ativo)

    })
  }

}
