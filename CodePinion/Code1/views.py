from django.contrib.auth.models import User
from . import models
#
from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.core.files.storage import default_storage

from django.http import JsonResponse
import base64
from django.core.files.base import ContentFile
# from . import resorce
from .resorce import SecureShell

#from .mail import Welcome_Mail
# Create your views here.

# Home Page with Navigation and Footer
def HomeInherit(request):
    return render(request,'Inherit/home.html')

# The Inherited upper Navigation Rendering Function
def UpperNav(request):
    return render(request,'Inherit/upper-nav.html')


# Sign up page
def signUp(request):

    # Check if user is authenticated
    if request.user.is_authenticated:
        return redirect('dash')
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
            #Create_User_Signal(user)

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
        return redirect('dash')
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
        

# The profile rendering function
@login_required
def Profile(request):

    # Get the profile picture url of current user
    profile = models.Profile.objects.get(user = request.user)

    if profile.profile_pic != '':
        profile_pic_url = profile.profile_pic.url
    else:
        profile_pic_url = ''

    data_dict = {
        'profile_pic_url':profile_pic_url,
    }

    return render(request, 'Main/profile.html', data_dict)


# Update Profile
def UpdateProfile(request):
    
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        # Get the data
        update_item = request.POST.get('to_update')
        # Get the current profile
        current_profile = models.Profile.objects.get(user = request.user)

        # Updating profile picture
        if update_item == 'profile_pic':
                
            # Get the profile picture
            profile_pic = request.FILES.get('profile_pic')
            # Update the profile picture
            current_profile.profile_pic = profile_pic
            current_profile.save()
            profile_pic_url = current_profile.profile_pic.url

            return JsonResponse({'profile_pic_url':profile_pic_url})
        
        elif update_item == 'remove_profile_pic':

            # Delete the profile picture
            default_storage.delete(current_profile.profile_pic.path)
            current_profile.profile_pic = None
            current_profile.save()

            return JsonResponse({'message':'suceess'})
        
        elif update_item == 'bio':

            # Get the bio
            bio = request.POST.get('bio')
            current_profile.bio = bio
            current_profile.save()
            # Get the new bio
            bio = current_profile.bio

            return JsonResponse({'bio':bio})
        
        elif update_item == 'all_details':

            # Get the data : fullname,secondary_email,company,location,website
            full_name = request.POST.get('fullname')
            secondary_email = request.POST.get('secondary_email')
            company = request.POST.get('company')
            location = request.POST.get('location').capitalize()
            website = request.POST.get('website')

            # Update the data
            current_profile.full_name = full_name
            current_profile.secondary_email = secondary_email
            current_profile.company = company
            current_profile.location = location
            current_profile.website = website
            current_profile.save()

            # Get the new data
            new_full_name = current_profile.full_name
            new_secondary_email = current_profile.secondary_email
            new_company = current_profile.company
            new_location = current_profile.location
            new_website = current_profile.website

            return JsonResponse({'fullname':new_full_name,'secondary_email':new_secondary_email,'company':new_company,'location':new_location,'website':new_website})



# The Logged In Dash Rendering Function (dash)
@login_required
def Dashboard(request):
    return render(request, 'Main/home.html')


# The Safes Rendering Fuction
@login_required
def Safes(request):
    return render(request,'Main/safes.html')


# Code Editor Rendering Function
@login_required
def CodeEditor(request):

    pending_bugs_count = models.Report_Bug.objects.filter(bug_status = False).count()
    resolved_bugs_count = models.Report_Bug.objects.filter(bug_status = True).count()

    demo_available = None
    user_is_in_demo = None

    # Check if demo exists
    if models.Demo.objects.filter(demo_name = 'CodePinion Editor Demo').exists() == False:
        demo_available = False
        user_is_in_demo = False
    else:
        demo = models.Demo.objects.get(demo_name = 'CodePinion Editor Demo')
        invite_sent = demo.demo_invite_sent

        if invite_sent == False:
            demo_available = False
            user_is_in_demo = False
        else:
            demo_available = True
            user_is_in_demo = demo.demo_users.filter(user = request.user).exists()
        

    data_dict = {
        'pending_bugs_count':pending_bugs_count,
        'resolved_bugs_count':resolved_bugs_count,
        'user_is_in_demo':user_is_in_demo,
        'demo_available':demo_available,
    }

    return render(request, 'Main/Editor.html', data_dict)

# Join demo function
def JoinDemo(request):

    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        # Get the demo with the title CodePinion Editor Demo
        demo = models.Demo.objects.get(demo_name = 'CodePinion Editor Demo')
        # Add the user to the demo
        demo.demo_users.add(request.user.profile)

        return JsonResponse({'status':'success'})

# Fetch the bugs
def FetchBugs(request):
    
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        fetched_bug_status = request.POST.get('bug_status')
        fetch_bug_filter = request.POST.get('filter_applied')

        # all bugs
        all_bugs = None
        # The number of bugs to be fetched
        requested_bug_count = 0
        # List of all the requested bugs
        requested_bugs_list = []

        # All Filter
        if fetched_bug_status == 'pending' and fetch_bug_filter == 'All':
            requested_bug_count = models.Report_Bug.objects.filter(bug_status = False).count()
            all_bugs = models.Report_Bug.objects.filter(bug_status = False).order_by('-update')

        elif fetched_bug_status == 'fixed' and fetch_bug_filter == 'All':
            requested_bug_count = models.Report_Bug.objects.filter(bug_status = True).count()
            all_bugs = models.Report_Bug.objects.filter(bug_status = True).order_by('-update')

        # Mine filter
        elif fetched_bug_status == 'pending' and fetch_bug_filter == 'Mine':
            # Get all pending bugs that belong to current user
            requested_bug_count = models.Report_Bug.objects.filter(bug_status = False, profile = request.user.profile).count()
            all_bugs = models.Report_Bug.objects.filter(bug_status = False, profile = request.user.profile).order_by('-update')

        elif fetched_bug_status == 'fixed' and fetch_bug_filter == 'Mine':
            # Get all fixed bugs that belong to current user
            requested_bug_count = models.Report_Bug.objects.filter(bug_status = True, profile = request.user.profile).count()
            all_bugs = models.Report_Bug.objects.filter(bug_status = True, profile = request.user.profile).order_by('-update')

        # Others filter
        elif fetched_bug_status == 'pending' and fetch_bug_filter == 'Others':
            # Get all pending bugs that belong to other users except current user
            requested_bug_count = models.Report_Bug.objects.filter(bug_status = False).exclude(profile = request.user.profile).count()
            all_bugs = models.Report_Bug.objects.filter(bug_status = False).exclude(profile = request.user.profile).order_by('-update')

        elif fetched_bug_status == 'fixed' and fetch_bug_filter == 'Others':
            # Get all fixed bugs that belong to other users except current user
            requested_bug_count = models.Report_Bug.objects.filter(bug_status = True).exclude(profile = request.user.profile).count()
            all_bugs = models.Report_Bug.objects.filter(bug_status = True).exclude(profile = request.user.profile).order_by('-update')


        # Add the bugs to the list
        for bug in all_bugs:

            # Check if current user is same as the bug reporter
            bug_reporter_is_current_user = False
            if bug.profile.user == request.user:
                bug_reporter_is_current_user = True
            else:
                bug_reporter_is_current_user = False

            # get the user profile picture
            bug_reporter_profile_picture = bug.profile.profile_pic
            bug_reporter_prof_pic = ''

            if bug_reporter_profile_picture == '':
                bug_reporter_prof_pic = 'False'
            else:
                bug_reporter_prof_pic = bug_reporter_profile_picture.url

            bug_dict = {
                'bug_id':bug.bug_id,
                'bug_title':bug.bug_title,
                'bug_status':bug.bug_status,
                'bug_update':bug.update.strftime('%d %b %Y'),
                'bug_reporter':bug.profile.full_name,
                'bug_reporter_prof_pic':bug_reporter_prof_pic,
                'bug_reporter_is_superuser':bug.profile.user.is_superuser,
                'bug_reporter_is_current_user':bug_reporter_is_current_user,
                # 'bug_desc':bug.bug_desc,
                # 'bug_reporter_email':bug.profile.user.email,
                # 'bug_screenshot':bug.bug_screenshot.url,
            }

            requested_bugs_list.append(bug_dict)

        return JsonResponse({'status':'success','bug_count':requested_bug_count,'bugs':requested_bugs_list})
    
# Update a bug
def UpdateBug(request):
        
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        bug_id = request.POST.get('id')
        bug_title = request.POST.get('title')
        bug_body = request.POST.get('body')

        # Get the bug
        bug = models.Report_Bug.objects.get(bug_id = bug_id)
        # Update the bug
        bug.bug_title = bug_title
        bug.bug_desc = bug_body
        bug.bug_status = False
        # Save the bug
        bug.save()

        # Count both the pending and resolved bugs
        pending_bugs_count = models.Report_Bug.objects.filter(bug_status = False).count()
        resolved_bugs_count = models.Report_Bug.objects.filter(bug_status = True).count()

        return JsonResponse({'status':'success','pending_bugs_count':pending_bugs_count,'resolved_bugs_count':resolved_bugs_count})    
    
# Fetch a single bug
def FetchSingleBug(request):
    
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':

        bug_id = request.POST.get('bug_id')
        # Get the bug
        bug = models.Report_Bug.objects.get(bug_id = bug_id)

        # Check if current user is same as the bug reporter
        bug_reporter_is_current_user = False
        if bug.profile.user == request.user:
            bug_reporter_is_current_user = True
        else:
            bug_reporter_is_current_user = False

        # get the user profile picture
        bug_reporter_profile_picture = bug.profile.profile_pic
        bug_reporter_prof_pic = ''

        if bug_reporter_profile_picture == '':
            bug_reporter_prof_pic = 'False'
        else:
            bug_reporter_prof_pic = bug_reporter_profile_picture.url

        bug_dict = {
            'bug_id':bug.bug_id,
            'bug_title':bug.bug_title,
            'bug_desc':bug.bug_desc,
            'bug_status':bug.bug_status,
            'bug_screenshot':bug.bug_screenshot.url,
            'bug_date':bug.update.strftime('%d %b %Y'),
            'bug_reporter':bug.profile.full_name,
            'bug_reporter_prof_pic':bug_reporter_prof_pic,
            'bug_reporter_is_superuser':bug.profile.user.is_superuser,
            'bug_reporter_is_current_user':bug_reporter_is_current_user,
        }

        return JsonResponse({'bug':bug_dict})

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
        #bug.save()

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

# Test Mail Function
# def TestMail(request):

#     #Demo_Invite_Mail()

#     return render(request, 'Mail/bug_fixed.html')