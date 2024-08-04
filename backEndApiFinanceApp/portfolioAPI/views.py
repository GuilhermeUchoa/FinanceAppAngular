from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import render, HttpResponse
from django.shortcuts import get_object_or_404
from django.views.generic import TemplateView
from . serializers import PortfolioSerializer
from rest_framework import viewsets, filters
from . carteiraAddCei import carteiraAddCei, precoMedioAnual
from . models import PortfolioModels
from django.http import JsonResponse
from datetime import date, timedelta
import yfinance as yf
import pandas as pd
import warnings
from . microsoftGraph import deletarArquivoOneDrive, criarPastaOneDrive, listarArquivoOneDrive, uploadArquivoOneDrive, downloadArquivoOneDrive

warnings.simplefilter("ignore")

# Create your views here.
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

def atualizarCotacao(request):
    """Atualiza as cotacoes"""
    try:
        #Maneira de se caso a data atual for sabado ou domingo retorna a cotacao de sexta
        Carteira = PortfolioModels
        # if date.today().weekday() in [5,6]:
        #     sexta = date.today().weekday() - 4
        #     data_atual = date.today() - timedelta(days=sexta)
        # else:
        #     data_atual = date.today()

    
        df = pd.DataFrame(round(yf.download([i.ativo+'.SA' for i in Carteira.objects.filter().exclude(tipo='rendaFixa')],
                                            start= f"{date.today().year}-01-01",
                                            threads=True)['Close'],2))
        
        df.fillna(0,inplace=True)
        
        for i in df:
            
            ativo = str(i[:-3])
            cotacao = df[i][-1]
            cotacaoDoInicioDoAno = df[i][0]
            carteira = get_object_or_404(Carteira,ativo=ativo)
            carteira.cotacao = cotacao
            carteira.valor = cotacao * carteira.quantidade
            carteira.variacaoAnual = (cotacao/cotacaoDoInicioDoAno - 1)
            carteira.save()
    except:
        pass

    return JsonResponse({'message': 'Cotacao atualizada'})

def sincronizarDownload(request):
    
    try:
        downloadArquivoOneDrive()
        print("Sincronizacao de Download Realizado...")
    except:
        print("ERROR: Sincronizacao de Download NAO Realizado...")
        
    
    return JsonResponse({'message': 'Download Finalizado...'})

def sincronizarUpload(request):
    try:
        deletarArquivoOneDrive()
    except:
        print('ERROR: Nao foi possivel deletar pasta no oneDrive')
        
    criarPastaOneDrive()
    
    try:
        uploadArquivoOneDrive()
        print("Sincronizacao de Upload Realizado...")
    except:
        print('ERROR: Nao foi possivel realizar upload na pasta do oneDrive')
        
    return JsonResponse({'message': 'Upload Finalizado...'})

class PortfolioViewSet(viewsets.ModelViewSet):

    #Serializacao de Models
    queryset = PortfolioModels.objects.all()
    serializer_class = PortfolioSerializer
    
    # Filtro = filter_backends, search = search_fields
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["status"]
    search_fields = ["ativo", "status","tipo"]
    ordering_fields = "__all__"

