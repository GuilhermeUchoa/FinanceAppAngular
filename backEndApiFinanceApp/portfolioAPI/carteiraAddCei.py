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


            else:
                ativo = valor['Código de Negociação'].loc[i]
       
     
            try:
                Carteira.objects.filter(ativo=ativo).get()
                if Carteira.objects.filter(ativo=ativo).get().ativo == ativo:
                    carteira = Carteira.objects.filter(ativo=ativo).get()
                    carteira.quantidade = valor['Quantidade'].loc[i]
                    carteira.save()
                    print(f'Ativo {ativo} atualizado')
            except:
            
                if chave == 'rendaFixa':
                    print(valor['Quantidade'].loc[i])
                    carteira = Carteira(
                        ativo = ativo,
                        quantidade = valor['Quantidade'].loc[i],
                        cotacao = valor['Valor líquido'].loc[i]/valor['Quantidade'].loc[i],
                        valor = valor['Valor líquido'].loc[i],
                        tipo = chave
                        )
                else:
                    carteira = Carteira(
                        ativo = ativo,
                        quantidade = valor['Quantidade'].loc[i],
                        cotacao = 0,
                        valor = 0,
                        tipo = chave
                        )
                    
                carteira.save()
                print(f'novo ativo {ativo} adicionado a carteira')
                