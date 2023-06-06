from django.urls import path
from . import views

urlpatterns = [

    #Upper Navigation Inherit Url
    path('', views.UpperNav, name='upper-nav')
]