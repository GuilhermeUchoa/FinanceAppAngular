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
        ("acao", "acao"),
        ("bdr", "bdr"),
        ("fii", "fii"),
        ("rendaFixa", "rendaFixa"),
    )

    # Usuario
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)

    # Dados iniciais
    ativo = models.CharField(max_length=250)
    cotacao = models.FloatField(blank=True, null=True)
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

    # Comentarios
    comentarios = models.TextField(blank=True, null=True)

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
