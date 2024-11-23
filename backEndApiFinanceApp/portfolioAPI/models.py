from django.db import models

# Create your models here.
class PortfolioModels(models.Model):

    StatusToBuy = (
        ("comprar","comprar"),
        ("aguardar","aguardar"),
        ("vender","vender")
    )

    TIPO = (
        ("acao","acao"),
        ("bdr","bdr"),
        ("fii","fii"),
        ("rendaFixa","rendaFixa"),
    )

    ativo = models.CharField(max_length=250, unique=True)
    cotacao = models.FloatField(blank=True, null=True)
    porcentagem = models.FloatField(blank=True, null=True)
    variacaoAnual = models.FloatField(blank=True, null=True)
    meta = models.FloatField(blank=True, null=True)
    dy = models.FloatField(blank=True, null=True)
    quantidade = models.FloatField(blank=True, null=True, default=0)
    status = models.CharField(max_length=250,choices=StatusToBuy, default="comprar")
    tipo = models.CharField(max_length=250,choices=TIPO)
    valor = models.FloatField(blank=True, null=True, default=0)
    aporte = models.IntegerField(blank=True, null=True, default=0)
    precoMedio = models.FloatField(blank=True, null=True)

    # preco maximo a 6%
    valuation = models.FloatField(blank=True, null=True)

    # DFC
    valuationDFC = models.FloatField(blank=True, null=True)
    
    
    comentarios = models.TextField(blank=True, null=True)


