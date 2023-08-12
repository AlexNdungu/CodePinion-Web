from django.contrib.auth.models import User
from . import models
#
from django.shortcuts import render
from django.http import JsonResponse
#from . import resorce
from .resorce import SecureShell,Create_User_Signal

# import subprocess 
# import os


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

#Create new user
def createNewUser(request):

    #Email will always be unique for any user

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        email = request.POST.get('email')
        password = request.POST.get('password')

        #Now we check if the user exists
        if User.objects.filter(email=email).exists():
            
            return JsonResponse({'status':'exists'})

        else:

            #Create the user
            user = User.objects.create_user(username=email, email=email, password=password)

            #call the create user signal
            Create_User_Signal(user)

            return JsonResponse({'status':'created'})

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

#Login to ssh
def getLocalPath(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            
        #ssh_process = request.POST.get('ssh_activity')

        #Host name
        host_name = request.POST.get('host_name')
        #Port Number
        port_number = int(request.POST.get('port_number'))
        #User name
        user_name = request.POST.get('user_name')
        #password
        password = request.POST.get('password')

        #Call class
        login_instance = SecureShell(host_name,port_number,user_name,password)

        #use the login instance to receive the response
        server_reponse = login_instance.sshLogin()

        print(server_reponse)

        if server_reponse != 'Error':

            #Clean the return by
            dir_list = []

            for dir in server_reponse[2]:

                dir_new = dir.replace("\r", "").replace("\n", "")
                dir_list.append(dir_new)

            #Get the current path 
            current_dir_path = server_reponse[1][0].replace("\r", "").replace("\n", "")

            #Get the os
            current_os = server_reponse[0]

            return JsonResponse({'status':'success', 'dir_list':dir_list, 'current_dir_path':current_dir_path,'current_os':current_os})
        
        else:

            error_message = 'Authentication Error. Try Other Credentials'

            print(error_message)

            return JsonResponse({'status':'fail', 'Error Message':error_message})


#Enter Intender Dir
def cdIntoDir(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        #Intended Path
        intended_path = request.POST.get('intended_path')

        return JsonResponse({'status':'success','path':intended_path})