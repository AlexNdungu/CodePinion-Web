from django.shortcuts import render
from django.http import JsonResponse
from . import resorce
import subprocess 
import os


# Create your views here.

#The Inherited upper Navigation Rendering Function
def UpperNav(request):
    return render(request,'Inherit/upper-nav.html')

#The Navigation Rendering Function
def LeftNav(request):
    return render(request,'Inherit/left-nav.html')

#The Home Rendering Function
def Home(request):
    return render(request, 'Main/home.html')
#The Safes Rendering Fuction
def Safes(request):
    return render(request,'Main/safes.html')

#New Safe And New Folder
def CreateSafe(request):
    return render(request, 'Main/create_safe.html')     

#New Safe Connected To Existing Project Folder
def ConnectSafe(request):
    return render(request, 'Main/connect_safe.html')

#Lets get the path we are to connect to
def getLocalPath(request):
    
    #Call the ssh client function
    print(resorce.ssh_client_action())

    return JsonResponse({'status':'success', 'path':'result3'})
