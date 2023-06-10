from django.shortcuts import render

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