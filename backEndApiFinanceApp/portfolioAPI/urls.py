from django.urls import include, path
from . import views
from rest_framework import routers

app_name = 'portfolioAPI'

router = routers.DefaultRouter()
router.register('portfolio', views.PortfolioViewSet, basename='portfolio') #precisa do basename para reescrever classe na view

urlpatterns = [
    path('', include(router.urls)),

    path('atualizarCotacao/', views.atualizarCotacao, name='atualizarCotacao'),
    path('fileUpload/', views.upload_file, name='FileUpload'),
    path('register/',views.register_user,name='register_user')


]
