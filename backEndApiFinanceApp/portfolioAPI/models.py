from django.db import models
from django.db.models import Sum, F
from django.contrib.auth.models import User

# Create your models here.


class PortfolioModels(models.Model):

    StatusToBuy = (
        ("comprar", "comprar"),
        ("aguardar", "aguardar"),
        ("vender", "vender")
    )

    TIPO = (
        ("Acoes", "Acoes"),
        ("Brazilian Depositary Receipts", "Brazilian Depositary Receipts"),
        ("Fundo de Investimento", "Fundo de Investimento"),
        ("Tesouro Direto", "Tesouro Direto"),
    )

    # Usuario
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)

    # Dados iniciais
    ativo = models.CharField(max_length=250)
    cotacao = models.FloatField(blank=True, null=True, default=0)
    quantidade = models.FloatField(blank=True, null=True, default=0)
    valor = models.FloatField(blank=True, null=True, default=0)

    # Porcentagens
    porcentagem = models.FloatField(blank=True, null=True)
    variacaoAnual = models.FloatField(blank=True, null=True)
    meta = models.FloatField(blank=True, null=True)
    dy = models.FloatField(blank=True, null=True)

    # Classificação
    status = models.CharField(
        max_length=250, choices=StatusToBuy, default="comprar")
    tipo = models.CharField(max_length=250, choices=TIPO)
    aporte = models.IntegerField(blank=True, null=True, default=0)

    # Valuation
    precoMedio = models.FloatField(blank=True, null=True)
    valuationDy = models.FloatField(blank=True, null=True)  # preco maximo a 6%
    valuationDFC = models.FloatField(blank=True, null=True)

    # Valuation qualitativo
    comentarios = models.TextField(blank=True, null=True)
    question0 = models.FloatField(default=0)
    question1 = models.FloatField(default=0)
    question2 = models.FloatField(default=0)
    question3 = models.FloatField(default=0)
    question4 = models.FloatField(default=0)
    question5 = models.FloatField(default=0)
    question6 = models.FloatField(default=0)
    question7 = models.FloatField(default=0)
    question8 = models.FloatField(default=0)
    question9 = models.FloatField(default=0)
    question10 = models.FloatField(default=0)
    question11 = models.FloatField(default=0)

    # Formulario
    scoreQualitativo = models.FloatField(blank=True, null=True, default=0)

    #
    def calculoScoreQualitativo(self):
        soma = (self.question0 + self.question1 + self.question2 + self.question3 + self.question4 + self.question5 + self.question6 +
                self.question7 + self.question8 + self.question9 + self.question10 + self.question11)
        
        return float(soma)
        

        

    def calculoValor(self):
        ''' cotacao * quantidade de cada ativo '''
        valorPorAtivo = self.cotacao * self.quantidade
        return valorPorAtivo

    def calculoValorTotal(self):
        ''' Soma geral do valor investido na carteira '''
        total_geral = PortfolioModels.objects.aggregate(
            total=Sum(F('cotacao') * F('quantidade')))
        return total_geral['total']

    def calculoPorcentagem(self):
        ''' quanto cada ativo tem do valor total (em porcentagem)'''
        total_geral = PortfolioModels.objects.aggregate(
            total=Sum(F('cotacao') * F('quantidade')))

        porcentagem = round((self.calculoValor()/total_geral['total'])*100, 2)
        return porcentagem

    def calculoMetaTotal(self):
        metaTotal = PortfolioModels.objects.aggregate(Sum('meta'))
        return metaTotal['meta__sum']

    class Meta:
        
        # Restrições: o par (usuario, ativo) deve ser único
        constraints = [
            models.UniqueConstraint(
                fields=['usuario', 'ativo'], name='unique_portfolio_per_user')
        ]

    def __str__(self) -> str:
        return self.ativo
    
    def save(self, *args, **kwargs):
        # Antes de salvar, calcula o score qualitativo
        self.scoreQualitativo = self.calculoScoreQualitativo()
        super(PortfolioModels, self).save(*args, **kwargs)  # Chama o método save da classe pai


