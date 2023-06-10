from django.urls import path
from . import views

urlpatterns = [

    #Upper Navigation Inherit Url
    path('', views.UpperNav, name='upper-nav'),

    #Left Navigation Inherit Url
    path('left_nav/',views.LeftNav, name='left-nav'),

    #Home Url
    path('home/', views.Home, name='home'),
    
    #Safes Url
    path('safes/', views.Safes, name='safes'),

    #New Safe and New Folder Url
    path('create_safe/', views.CreateSafe, name='create_safe_folder'),
]