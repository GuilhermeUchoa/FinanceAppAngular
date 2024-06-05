from django.contrib import admin
from .models import PortfolioModels

# Register your models here.
@admin.register(PortfolioModels)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ["ativo","cotacao","porcentagem","meta","quantidade","status","tipo","valor"]
    list_filter = ("status","tipo")
    

