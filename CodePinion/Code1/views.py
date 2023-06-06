from django.shortcuts import render

# Create your views here.

#The inherited upper Navigation Rendering Function
def UpperNav(request):
    return render(request,'Inherit/upper-nav.html')