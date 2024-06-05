from django.shortcuts import render
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from . serializers import PortfolioSerializer
from . models import PortfolioModels
from django.db.models import Sum
import requests

# Create your views here.
class PortfolioViewSet(viewsets.ModelViewSet):

    
    def getCotacao():

        cookies = {
        'A3': 'd=AQABBNT-TWYCEBkEpufcCSIPExXUS3gJlEwFEgEBAQFQT2ZXZgAAAAAA_eMAAA&S=AQAAAih8Gwd0P5i7wqc4ehZCwyQ',
        'A1': 'd=AQABBNT-TWYCEBkEpufcCSIPExXUS3gJlEwFEgEBAQFQT2ZXZgAAAAAA_eMAAA&S=AQAAAih8Gwd0P5i7wqc4ehZCwyQ',
        'A1S': 'd=AQABBNT-TWYCEBkEpufcCSIPExXUS3gJlEwFEgEBAQFQT2ZXZgAAAAAA_eMAAA&S=AQAAAih8Gwd0P5i7wqc4ehZCwyQ',
        }

        headers = {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'cache-control': 'max-age=0',
            'cookie': 'A3=d=AQABBNT-TWYCEBkEpufcCSIPExXUS3gJlEwFEgEBAQFQT2ZXZgAAAAAA_eMAAA&S=AQAAAih8Gwd0P5i7wqc4ehZCwyQ; A1=d=AQABBNT-TWYCEBkEpufcCSIPExXUS3gJlEwFEgEBAQFQT2ZXZgAAAAAA_eMAAA&S=AQAAAih8Gwd0P5i7wqc4ehZCwyQ; A1S=d=AQABBNT-TWYCEBkEpufcCSIPExXUS3gJlEwFEgEBAQFQT2ZXZgAAAAAA_eMAAA&S=AQAAAih8Gwd0P5i7wqc4ehZCwyQ',
            'priority': 'u=0, i',
            'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        }


        #Atribuindo cotacao de cada ativo em meu banco de dados
        PortfolioModelsBD  = PortfolioModels.objects.all()
        for i in PortfolioModelsBD:
     
            response = requests.get(
            f'https://query1.finance.yahoo.com/v8/finance/chart/{i.ativo}.SA?metrics=high?&interval=1d&range=1d',
            cookies=cookies,
            headers=headers,
            )

            data = response.json()
            price = data["chart"]["result"][0]["meta"]["regularMarketPrice"]
			
            i.cotacao = price
            i.valor = i.quantidade * i.cotacao

            i.save()
        
        #Porcentagens e valor Total
        valorTotal = PortfolioModels.objects.filter().aggregate(Sum('valor'))['valor__sum']
        for i in PortfolioModelsBD:
            i.porcentagem = i.valor/valorTotal
            i.save()
        

    #Serializacao de Models
    getCotacao()
    queryset = PortfolioModels.objects.all()
    serializer_class = PortfolioSerializer
    

    # Filtro = filter_backends, search = search_fields
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["status"]
    search_fields = ["ativo", "status","tipo"]
    ordering_fields = "__all__"