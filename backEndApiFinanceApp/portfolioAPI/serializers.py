from rest_framework import serializers
from . models import PortfolioModels
from django.contrib.auth import get_user_model

class PortfolioSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioModels
        fields = [i.name for i in PortfolioModels._meta.get_fields()]


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id","email","username","first_name","last_name","password"]
        extra_kwargs = {
            'password': {'write_only':True}
        }

    def create(self,validated_data):
        
        email = validated_data["email"]
        username = validated_data["username"]
        first_name = validated_data["first_name"]
        last_name = validated_data["last_name"]
        password = validated_data["password"]


        user = get_user_model()
        new_user = user.objects.create_user(email=email,username=username,first_name=first_name,last_name=last_name, password=password)
        return new_user

