from rest_framework import serializers
from . models import PortfolioModels

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioModels
        fields = [i.name for i in PortfolioModels._meta.get_fields()]

