
from django.shortcuts import get_object_or_404

from . serializers import PortfolioSerializer
from . carteiraAddCei import carteiraAddCei, precoMedioAnual
from . models import PortfolioModels
from django.http import JsonResponse
from datetime import date, timedelta, datetime
import yfinance as yf
import pandas as pd
import warnings

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes

warnings.simplefilter("ignore")


class PortfolioViewSet(viewsets.ModelViewSet):
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    #Serializacao de Models
    queryset = PortfolioModels.objects.all()
    serializer_class = PortfolioSerializer
    
    # Filtro = filter_backends, search = search_fields
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["status"]
    search_fields = ["ativo", "status","tipo"]
    ordering_fields = "__all__"



# Create your views here.
@api_view(['POST'])
@authentication_classes([JWTAuthentication]) 
def upload_file(request):
    
    if request.method == 'POST' and request.FILES['file']:
        uploaded_file = request.FILES['file']
        name = request.FILES['file'].name

        if name[0:7] == 'posicao':
            carteiraAddCei(uploaded_file)
        if name[0:10] == 'negociacao':
            precoMedioAnual(uploaded_file)

        # Faça algo com o arquivo, como salvá-lo no servidor
        # Exemplo: uploaded_file.save('/path/to/save/location')
        return JsonResponse({'message': 'File uploaded successfully'})
    else:
        return JsonResponse({'error': 'No file found in request'}, status=400)

@api_view(['GET'])
@authentication_classes([JWTAuthentication]) 
def atualizarCotacao(request):
    """Atualiza as cotacoes"""
    try:

        Carteira = PortfolioModels
    
        df = pd.DataFrame(round(yf.download([i.ativo+'.SA' for i in Carteira.objects.filter().exclude(tipo='rendaFixa')],
                                            start= f"{date.today().year}-01-01",
                                            threads=True)['Close'],2))
        
        df.fillna(0,inplace=True)

        data_atual = datetime.now()
        data_12_meses_atras = data_atual - timedelta(days=365)
        
        for i in df:
            
            ativo = str(i[:-3])
            cotacao = df[i][-1]
            cotacaoDoInicioDoAno = df[i][0]
            carteira = get_object_or_404(Carteira,ativo=ativo)
            carteira.cotacao = cotacao
            carteira.valor = cotacao * carteira.quantidade
            carteira.variacaoAnual = (cotacao/cotacaoDoInicioDoAno - 1)

            try:
                # Calculando dividend yield para achar o preço maximo de compra com 6%
                acao = yf.Ticker(i)
                dividendos_ano_atual = acao.dividends[(acao.dividends.index >= str(data_12_meses_atras))]
                dividendo_total_ano = dividendos_ano_atual.sum()
                dividend_yield = (dividendo_total_ano / cotacao)
                carteira.dy = round(dividend_yield*100,2)
                # Calculo de preço maximo a 6%
                if carteira.tipo == 'fii':    
                    precoMaximo = (cotacao*dividend_yield)/0.09
                else:
                    precoMaximo = (cotacao*dividend_yield)/0.06
                carteira.valuation = round(precoMaximo,2)

            except:
                pass

            carteira.save()
    except:
        pass

    return JsonResponse({'message': 'Cotacao atualizada'})



