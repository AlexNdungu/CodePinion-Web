from django.urls import path
from . import views

urlpatterns = [

    #Upper Navigation Inherit Url
    path('', views.UpperNav, name='upper-nav'),

    #Left Navigation Inherit Url
    path('left_nav/',views.LeftNav, name='left-nav'),

    #Home Url
    path('home/', views.Home, name='home')
]