from rest_framework import serializers
from . models import PortfolioModels

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioModels
        fields = ["ativo","cotacao","meta","quantidade","status","tipo","valor","aporte","comentarios"]