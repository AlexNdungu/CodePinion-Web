from django.contrib.auth.models import User
from . import models
#
from django.shortcuts import render
from django.http import JsonResponse
#from . import resorce
from .resorce import SecureShell,Create_User_Signal
from cryptography.fernet import Fernet

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

    current_profile = models.Profile.objects.get(user = request.user)

    # Get list of ssh devices
    ssh_devices = models.SSH_Devices.objects.filter(profile = current_profile)

    return render(request, 'Main/connect_safe.html', {'ssh_devices':ssh_devices})

#Login to ssh
def getLocalPath(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        # Host name
        host_name = request.POST.get('host_name')
        # Port Number
        port_number = int(request.POST.get('port_number'))
        # User name
        user_name = request.POST.get('user_name')
        # password
        password = request.POST.get('password')
        # get the current profile
        current_profile = models.Profile.objects.get(user = request.user)

        # Call class
        login_instance = SecureShell(host_name,port_number,user_name,password,current_profile)

        # Use the login instance to receive the response
        server_reponse = login_instance.ssh_login()


        if server_reponse != 'Error':

            return JsonResponse({'status':'success', 'dir_list':server_reponse[2], 'current_dir_path':server_reponse[1],'current_os':server_reponse[0]})
        
        else:

            error_message = 'Authentication Error. Try Other Credentials'

            return JsonResponse({'status':'fail', 'Error Message':error_message})


#Enter Intender Dir
def cdIntoDir(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        intended_path = request.POST.get('intended_path')
        host_name = request.POST.get('host_name')

        # The device instance with host_name = host_name
        ssh_device = models.SSH_Devices.objects.get(host_name = host_name)

        # Call the SecureShell class
        ssh_instance = SecureShell(ssh_device.host_name,ssh_device.host_port,ssh_device.host_username,ssh_device.host_password)
        # call the windows_command function
        server_response = ssh_instance.windows_command(intended_path)

        return JsonResponse({'status':'success','sub_dirs':server_response})
    