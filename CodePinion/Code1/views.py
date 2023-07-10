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

#Sign up page
def signUp(request):
    return render(request,'Main/signup.html')

#Sign in page
def signIn(request):
    return render(request,'Main/signin.html')

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

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        #Host name
        host_name = request.POST.get('host_name')
        #Port Number
        port_number = int(request.POST.get('port_number'))
        #User name
        user_name = request.POST.get('user_name')
        #password
        password = request.POST.get('password')
    
        #Call the ssh client function
        server_reponse = resorce.ssh_client_action(host_name,port_number,user_name,password)

        #Clean the return by
        dir_list = []

        for dir in server_reponse[1]:

            dir_new = dir.replace("\r", "").replace("\n", "")
            dir_list.append(dir_new)

        #Get the current path 
        current_dir_path = server_reponse[0][0].replace("\r", "").replace("\n", "")
        print(current_dir_path) 

        return JsonResponse({'status':'success', 'dir_list':dir_list, 'current_dir_path':current_dir_path})
