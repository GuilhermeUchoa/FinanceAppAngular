from . models import PortfolioModels as Carteira
import pandas as pd

#Preciso melhorar esse codigo
def carteiraAddCei(arquivo):

    df_acoes = pd.read_excel(arquivo,sheet_name=0).dropna()
    df_bdr = pd.read_excel(arquivo,sheet_name=1).dropna()
    df_fii = pd.read_excel(arquivo,sheet_name=2).dropna() 
    df_rf = pd.read_excel(arquivo,sheet_name=3).dropna()  

    dictAtivo = {'acao':df_acoes,
                 'bdr':df_bdr,
                 'fii':df_fii,
                 'rendaFixa':df_rf,
                 }
    
    for chave,valor in dictAtivo.items():
        
        for i in range(len(valor)):

            if chave == 'rendaFixa':
                ativo = valor['Produto'].loc[i]
                quantidade = int(valor['Valor líquido'].loc[i])
                valor = int(valor['Valor líquido'].loc[i])
                cotacao = 1

            else:
                ativo = valor['Código de Negociação'].loc[i]
                quantidade = int(valor['Quantidade'].loc[i])
     
            try:
                Carteira.objects.filter(ativo=ativo).get()
                if Carteira.objects.filter(ativo=ativo).get().ativo == ativo:
                    carteira = Carteira.objects.filter(ativo=ativo).get()
                    carteira.quantidade = quantidade
                    carteira.save()
                    print(f'Ativo {ativo} atualizado')
            except:
            
                if chave == 'rendaFixa':
                    carteira = Carteira(
                        ativo = ativo,
                        quantidade = quantidade,
                        cotacao = cotacao,
                        valor = valor,
                        tipo = chave
                        )
                else:
                    carteira = Carteira(
                        ativo = ativo,
                        quantidade = quantidade,
                        cotacao = 0,
                        valor = 0,
                        tipo = chave
                        )
                    
                carteira.save()
                print(f'novo ativo {ativo} adicionado a carteira')
                