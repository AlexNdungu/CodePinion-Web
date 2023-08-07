from django.contrib.auth.models import User
from . import models
#
from django.shortcuts import render
from django.http import JsonResponse
#from . import resorce
from .resorce import SecureShell
from .generate import UserGen

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
            #Create a profile for the user
            profile = models.Profile(user=user)
            #Save the profile
            profile.save()

            #Strip the email
            stripped_mail = email.split('@')[0]

            #Check if the an email exists matching stripped mail
            if User.objects.filter(username=stripped_mail).exists():

                #Get the newly craeted profile id
                profile_id = str(profile.profile_id)
                #Create a new username with stripped mail and profile id
                new_username = stripped_mail + profile_id

                if User.objects.filter(username=new_username).exists():

                    #count the numebr of profiles 
                    profile_count = models.Profile.objects.count()
                    #
                    profile_count = profile_count + 1000
                    #Get a list of existing usernames
                    usernames = User.objects.values_list("username")
                    # Convert the QuerySet to a list
                    usernames = list(usernames)

                    #initialise the UserName Generator Class
                    username_gen = UserGen(email,profile_count)
                    #Call the GenMoreName method
                    generated_username = username_gen.GenMoreName(1,usernames)[0]

                    #Now asign the new username
                    user.username = generated_username
                    # Save the changes to the database
                    user.save()

                else:

                    user.username = new_username
                    # Save the changes to the database
                    user.save()

            else:

                user.username = stripped_mail
                # Save the changes to the database
                user.save()


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
            
        ssh_process = request.POST.get('ssh_activity')

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

        if ssh_process == 'Login':

            print('login')

            #use the login instance to receive the response
            server_reponse = login_instance.sshLogin()

            print(server_reponse)

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
        
        elif ssh_process == 'cd':

            print('cd')

            #Intended Path
            intended_path = request.POST.get('intended_path')

            return JsonResponse({'status':'success','path':intended_path})


#Enter Intender Dir
def cdIntoDir(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        #Intended Path
        intended_path = request.POST.get('intended_path')

        return JsonResponse({'status':'success','path':intended_path})