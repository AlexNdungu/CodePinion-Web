from django.urls import path
from . import views

urlpatterns = [

    # Home Url (landing Page)
    path('homeInherit/', views.HomeInherit, name='home-inherit'),

    # Privacy Policy Url
    path('privacyPolicy/', views.PrivacyPolicy, name='privacy-policy'),

    # Upper Navigation Inherit Url
    path('upperNav/', views.UpperNav, name='upper-nav'),

    # Sign up url
    path('',views.signUp, name='sign_up'),

    # Create new user
    path('createNewUser/', views.createNewUser, name='create_new_user'),

    # Sign in url
    path('signin/',views.signIn, name='signin'),

    # Sign in u
    path('signinUser/', views.signInUser, name='signin_user'),

    # Profile Url
    path('profile/', views.Profile, name='profile'),

    # Update Profile Url
    path('updateProfile/', views.UpdateProfile, name='update_profile'),

    # Logged In Home Url (Dashboard)
    path('dash/', views.Dashboard, name='dash'),
    
    # Safes Url
    path('safes/', views.Safes, name='safes'),

    # Code Editor Url
    path('codeEditor/', views.CodeEditor, name='code_editor'),

    # Join Demo Url
    path('joinDemo/', views.JoinDemo, name='join_demo'),

    # Fetch the bugs
    path('fetchBugs/', views.FetchBugs, name='fetch_bugs'),

    # Fetch a single bug
    path('fetchABug/', views.FetchSingleBug, name='fetch_bug'),

    # Report bug Url
    path('reportBug/', views.ReportBug, name='report_bug'),

    # Update bug Url
    path('updateBug/', views.UpdateBug, name='update_bug'),

    # New Safe and New Folder Url
    path('create_safe/', views.CreateSafe, name='create_safe_folder'),

    # New Safe Connected to Existing Project Folder Url
    path('connect_safe/', views.ConnectSafe, name='connect_safe_folder'),
    # Get local path
    path('getPath/', views.getLocalPath, name='get_local_path_connect'),

    # Enter Intended Dir
    path('cdDir/',views.cdIntoDir,name='enter_into_dir'),

    #Test mail
    #path('testMail/', views.TestMail, name='test_mail'),
]