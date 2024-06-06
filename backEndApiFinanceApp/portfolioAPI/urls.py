from django.urls import include, path
from . import views
from rest_framework import routers

app_name = 'portfolioAPI'

router = routers.DefaultRouter()
router.register('portfolio',views.PortfolioViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('atualizarCotacao/', views.atualizarCotacao, name='atualizarCotacao'),
    path('fileUpload/', views.upload_file, name='FileUpload'),

]