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
def CodeEditor(request):
    pending_bugs_count = models.Report_Bug.objects.filter(bug_status = False).count()
    resolved_bugs_count = models.Report_Bug.objects.filter(bug_status = True).count()
    demo_available = None
    user_is_in_demo = None
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
    return render(request, 'Editor/Editor.html', data_dict)

def JoinDemo(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        demo = models.Demo.objects.get(demo_name = 'CodePinion Editor Demo')
        demo.demo_users.add(request.user.profile)
        return JsonResponse({'status':'success'})

def FetchBugs(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        fetched_bug_status = request.POST.get('bug_status')
        fetch_bug_filter = request.POST.get('filter_applied')
        all_bugs = None
        requested_bug_count = 0
        requested_bugs_list = []
        if fetched_bug_status == 'pending' and fetch_bug_filter == 'All':
            requested_bug_count = models.Report_Bug.objects.filter(bug_status = False).count()
            all_bugs = models.Report_Bug.objects.filter(bug_status = False).order_by('-update')
        elif fetched_bug_status == 'fixed' and fetch_bug_filter == 'All':
            requested_bug_count = models.Report_Bug.objects.filter(bug_status = True).count()
            all_bugs = models.Report_Bug.objects.filter(bug_status = True).order_by('-update')
        elif fetched_bug_status == 'pending' and fetch_bug_filter == 'Mine':
            requested_bug_count = models.Report_Bug.objects.filter(bug_status = False, profile = request.user.profile).count()
            all_bugs = models.Report_Bug.objects.filter(bug_status = False, profile = request.user.profile).order_by('-update')
        elif fetched_bug_status == 'fixed' and fetch_bug_filter == 'Mine':
            requested_bug_count = models.Report_Bug.objects.filter(bug_status = True, profile = request.user.profile).count()
            all_bugs = models.Report_Bug.objects.filter(bug_status = True, profile = request.user.profile).order_by('-update')
        elif fetched_bug_status == 'pending' and fetch_bug_filter == 'Others':
            requested_bug_count = models.Report_Bug.objects.filter(bug_status = False).exclude(profile = request.user.profile).count()
            all_bugs = models.Report_Bug.objects.filter(bug_status = False).exclude(profile = request.user.profile).order_by('-update')
        elif fetched_bug_status == 'fixed' and fetch_bug_filter == 'Others':
            requested_bug_count = models.Report_Bug.objects.filter(bug_status = True).exclude(profile = request.user.profile).count()
            all_bugs = models.Report_Bug.objects.filter(bug_status = True).exclude(profile = request.user.profile).order_by('-update')
        for bug in all_bugs:
            bug_reporter_is_current_user = False
            if bug.profile.user == request.user:
                bug_reporter_is_current_user = True
            else:
                bug_reporter_is_current_user = False
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
            }
            requested_bugs_list.append(bug_dict)
        return JsonResponse({'status':'success','bug_count':requested_bug_count,'bugs':requested_bugs_list})

def UpdateBug(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        bug_id = request.POST.get('id')
        bug_title = request.POST.get('title')
        bug_body = request.POST.get('body')
        bug = models.Report_Bug.objects.get(bug_id = bug_id)
        bug.bug_title = bug_title
        bug.bug_desc = bug_body
        bug.bug_status = False
        bug.save()
        pending_bugs_count = models.Report_Bug.objects.filter(bug_status = False).count()
        resolved_bugs_count = models.Report_Bug.objects.filter(bug_status = True).count()
        return JsonResponse({'status':'success','pending_bugs_count':pending_bugs_count,'resolved_bugs_count':resolved_bugs_count})    

def FetchSingleBug(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        bug_id = request.POST.get('bug_id')
        bug = models.Report_Bug.objects.get(bug_id = bug_id)
        bug_reporter_is_current_user = False
        if bug.profile.user == request.user:
            bug_reporter_is_current_user = True
        else:
            bug_reporter_is_current_user = False
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

def ReportBug(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        screenShot = request.POST.get('screenshot')
        bug_title = request.POST.get('title')
        bug_desc = request.POST.get('body')
        user = request.user
        profile = models.Profile.objects.get(user = user)
        format, imgstr = screenShot.split(';base64,')
        ext = format.split('/')[-1]
        data = ContentFile(base64.b64decode(imgstr))
        bug = models.Report_Bug()
        bug.profile = profile
        bug.bug_title = bug_title
        bug.bug_desc = bug_desc
        bug.bug_screenshot.save('screenshot.' + ext, data)
    return JsonResponse({'status':'success'})

@login_required
def NewSafe(request):
    return render(request, 'Editor/new_safe.html')
