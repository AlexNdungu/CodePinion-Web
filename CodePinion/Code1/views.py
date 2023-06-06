from django.shortcuts import render

# Create your views here.

#The Inherited upper Navigation Rendering Function
def UpperNav(request):
    return render(request,'Inherit/upper-nav.html')

#ThNavigation Rendering Function
def leftNav(request):
    return render(request,'Inherit/left-nav.html')