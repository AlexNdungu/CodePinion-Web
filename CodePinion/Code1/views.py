from django.contrib.auth.models import User
from . import models
from django.shortcuts import render, redirect
from django.contrib.auth import login,logout
from django.contrib.auth.decorators import login_required
from django.core.files.storage import default_storage
from django.http import JsonResponse
import base64
from django.core.files.base import ContentFile

def HomeInherit(request):
    return render(request,'Inherit/home.html')

def Landing(request):
    if request.user.is_authenticated:
        return redirect('dash')
    else:
        return render(request,'Landing/landing.html')

def PrivacyPolicy(request):
    return render(request,'Landing/privacy.html')

def TermsAndConditions(request):
    return render(request,'Landing/terms.html')

def UpperNav(request):
    return render(request,'Inherit/upper-nav.html')

def signUp(request):
    if request.user.is_authenticated:
        return redirect('dash')
    else:
        return render(request,'Landing/signup.html', {'error':''})

def createNewUser(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        email = request.POST.get('email')
        password = request.POST.get('password')
        if User.objects.filter(email=email).exists():
            return JsonResponse({'status':'exists'})
        else:
            user = User.objects.create_user(username=email, email=email, password=password)
            if not request.user.is_authenticated:
                login(request,user,backend='django.contrib.auth.backends.ModelBackend')
            return JsonResponse({'status':'created'})

def signIn(request):
    if request.user.is_authenticated:
        return redirect('dash')
    else:
        return render(request,'Landing/signin.html',{'error':''})

def signOut(request):  
    logout(request)
    return redirect('landing')

def signInUser(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        email = request.POST.get('email')
        password = request.POST.get('password')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            if user.check_password(password):
                login(request,user,backend='django.contrib.auth.backends.ModelBackend')
                return JsonResponse({'status':'found'})
            else:
                return JsonResponse({'status':'wrong_password'})
        else:
            return JsonResponse({'status':'not_found'})

@login_required
def Profile(request):
    profile = models.Profile.objects.get(user = request.user)
    if profile.profile_pic != '':
        profile_pic_url = profile.profile_pic.url
    else:
        profile_pic_url = ''
    data_dict = {
        'profile_pic_url':profile_pic_url,
    }
    return render(request, 'Editor/profile.html', data_dict)

def UpdateProfile(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        update_item = request.POST.get('to_update')
        current_profile = models.Profile.objects.get(user = request.user)
        if update_item == 'profile_pic':
            profile_pic = request.FILES.get('profile_pic')
            current_profile.profile_pic = profile_pic
            current_profile.save()
            profile_pic_url = current_profile.profile_pic.url
            return JsonResponse({'profile_pic_url':profile_pic_url})
        elif update_item == 'remove_profile_pic':
            default_storage.delete(current_profile.profile_pic.path)
            current_profile.profile_pic = None
            current_profile.save()
            return JsonResponse({'message':'suceess'})
        elif update_item == 'bio':
            bio = request.POST.get('bio')
            current_profile.bio = bio
            current_profile.save()
            bio = current_profile.bio
            return JsonResponse({'bio':bio})
        elif update_item == 'all_details':
            full_name = request.POST.get('fullname')
            secondary_email = request.POST.get('secondary_email')
            company = request.POST.get('company')
            location = request.POST.get('location').capitalize()
            website = request.POST.get('website')
            current_profile.full_name = full_name
            current_profile.secondary_email = secondary_email
            current_profile.company = company
            current_profile.location = location
            current_profile.website = website
            current_profile.save()
            new_full_name = current_profile.full_name
            new_secondary_email = current_profile.secondary_email
            new_company = current_profile.company
            new_location = current_profile.location
            new_website = current_profile.website
            return JsonResponse({'fullname':new_full_name,'secondary_email':new_secondary_email,'company':new_company,'location':new_location,'website':new_website})

@login_required
def Dashboard(request):
    return render(request, 'Editor/home.html')

@login_required
def Safes(request):
    return render(request,'Editor/safes.html')

@login_required
def NewSafe(request):
    return render(request, 'Editor/new_safe.html')

@login_required
def ToDoObjectives(request):
    return render(request,'Editor/todo.html')

def GetAllCurrentUserAccounts(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        
        current_user = request.user
        all_accounts = models.Profile.objects.filter(user = current_user)
        all_accounts_list = []

        for account in all_accounts:

            profile_url = ""
            if account.profile_url == None:
                profile_url = "None"
            else:
                profile_url = account.profile_url

            account_dict = {
                'account_image':profile_url,
                'account_name':account.full_name,
                'account_id':account.profile_id,
                'is_org':False,
            }
            all_accounts_list.append(account_dict)

    return JsonResponse({'accounts':all_accounts_list})