from . models import PortfolioModels as Carteira
import pandas as pd

#Preciso melhorar esse codigo
def carteiraAddCei(arquivo):
    listaCarteiraDF = []
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


            #Add para lista de carteiras que tem no DataFrame
            listaCarteiraDF.append(ativo)
     
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
                
    #Compara a carteira da B3 com a do APP se tiver algo a mais na carteira do APP significa que me desfiz do ativo na corretora e entao ele exclui o ativo da Carteira do app
    listaCarteiraBD = [i.ativo for i in Carteira.objects.all()]
    listaDeExclusao = list(set(listaCarteiraBD).difference(set(listaCarteiraDF)))
    for i in listaDeExclusao:
        
        carteira = Carteira.objects.filter(ativo=i).delete()
        print(f'Ativo {i} foi excluido da carteira')
   
                