from django.contrib import admin
from .models import PortfolioModels

# Register your models here.
@admin.register(PortfolioModels)
class PortfolioAdmin(admin.ModelAdmin):

    list_display = ['id', 'usuario','ativo', 'cotacao', 'porcentagem', 'variacaoAnual', 'meta', 'dy', 'quantidade', 'status', 'tipo', 'valor', 'aporte', 'precoMedio', 'valuationDy', 'valuationDFC']
    list_filter = ['status','tipo','usuario']
    list_editable = ['meta','status']
    search_fields = ['status','tipo','ativo','usuario']
    
    

