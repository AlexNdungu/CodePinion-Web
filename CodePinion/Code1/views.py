from django.contrib.auth.models import User
from django.urls import reverse
from . import models
#
from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required

from django.http import JsonResponse
import base64
from django.core.files.base import ContentFile
# from . import resorce
from .resorce import SecureShell,Create_User_Signal

# Create your views here.

# The Inherited upper Navigation Rendering Function
def UpperNav(request):
    return render(request,'Inherit/upper-nav.html')

# Sign up page
def signUp(request):

    # Check if user is authenticated
    if request.user.is_authenticated:
        return redirect('home')
    else:
        return render(request,'Main/signup.html', {'error':''})
        

# Create new user
def createNewUser(request):

    #Email will always be unique for any user

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        email = request.POST.get('email')
        password = request.POST.get('password')

        # Now we check if the user exists
        if User.objects.filter(email=email).exists():
            
            return JsonResponse({'status':'exists'})

        else:

            # Create the user
            user = User.objects.create_user(username=email, email=email, password=password)

            # call the create user signal
            Create_User_Signal(user)

            # Check if the user is logged in
            if not request.user.is_authenticated:
                # Login the user
                login(request,user,backend='django.contrib.auth.backends.ModelBackend')

            # Redirect the user to the dash page
            return JsonResponse({'status':'created'})


# Sign in page
def signIn(request):

    # Check if user is authenticated
    if request.user.is_authenticated:
        return redirect('home')
    else:
        return render(request,'Main/signin.html',{'error':''})


# Sign in user
def signInUser(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        email = request.POST.get('email')
        password = request.POST.get('password')

        # Check if the user exists
        if User.objects.filter(email=email).exists():

            # Get the user
            user = User.objects.get(email=email)

            # Check if the password is correct
            if user.check_password(password):

                # Login the user
                login(request,user,backend='django.contrib.auth.backends.ModelBackend')

                # Redirect the user to the dash page
                return JsonResponse({'status':'found'})

            else:

                return JsonResponse({'status':'wrong_password'})

        else:

            return JsonResponse({'status':'not_found'})


# The Home Rendering Function
@login_required
def Home(request):
    return render(request, 'Main/home.html')


# The Safes Rendering Fuction
@login_required
def Safes(request):
    return render(request,'Main/safes.html')


# Code Editor Rendering Function
@login_required
def CodeEditor(request):
    return render(request, 'Main/Editor.html')

# Report Bug
def ReportBug(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
    
        # Get all the data
        screenShot = request.POST.get('screenshot')
        bug_title = request.POST.get('title')
        bug_desc = request.POST.get('body')
        user = request.user
        profile = models.Profile.objects.get(user = user)

        # Change the screenshot to an image
        format, imgstr = screenShot.split(';base64,')
        ext = format.split('/')[-1]
        data = ContentFile(base64.b64decode(imgstr))

        # Save the image to the ImageField
        bug = models.Report_Bug()
        bug.profile = profile
        bug.bug_title = bug_title
        bug.bug_desc = bug_desc
        bug.bug_screenshot.save('screenshot.' + ext, data)
        bug.save()

    return JsonResponse({'status':'success'})


# New Safe Connected To Existing Project Folder
@login_required
def ConnectSafe(request):

    current_profile = models.Profile.objects.get(user = request.user)

    # Get list of ssh devices
    ssh_devices = models.SSH_Devices.objects.filter(profile = current_profile)

    return render(request, 'Main/connect_safe.html', {'ssh_devices':ssh_devices})


# Login to ssh
def getLocalPath(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        # Host name
        host_name = request.POST.get('host_name')

        # The device instance with host_name = host_name
        ssh_device = models.SSH_Devices.objects.get(host_name = host_name)
        
        # get the current profile
        current_profile = models.Profile.objects.get(user = request.user)

        # Call class
        login_instance = SecureShell(ssh_device.host_name,ssh_device.host_port,ssh_device.host_username,ssh_device.host_password,current_profile)

        # Use the login instance to receive the response
        server_reponse = login_instance.ssh_login()


        if server_reponse != 'Error':

            return JsonResponse({'status':'success', 'dir_list':server_reponse[2], 'current_dir_path':server_reponse[1],'current_os':server_reponse[0],'host_username':ssh_device.host_username})
        
        else:

            error_message = 'Authentication Error. Try Other Credentials'

            return JsonResponse({'status':'fail', 'Error Message':error_message})


# Enter Intender Dir
def cdIntoDir(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        intended_path = request.POST.get('intended_path')
        host_name = request.POST.get('host_name')

        # The device instance with host_name = host_name
        ssh_device = models.SSH_Devices.objects.get(host_name = host_name)

        # Call the SecureShell class
        ssh_instance = SecureShell(ssh_device.host_name,ssh_device.host_port,ssh_device.host_username,ssh_device.host_password)

        # call the  function
        server_response = ssh_instance.server_command(ssh_device.device_os.os_name,intended_path)

        return JsonResponse({'status':'success','sub_dirs':server_response})


# New Safe And New Folder
def CreateSafe(request):
    return render(request, 'Main/create_safe.html')     

    