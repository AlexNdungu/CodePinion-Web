from django.urls import path
from . import views

urlpatterns = [

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

    # Home Url
    path('dash/', views.Home, name='home'),
    
    # Safes Url
    path('safes/', views.Safes, name='safes'),

    # Code Editor Url
    path('codeEditor/', views.CodeEditor, name='code_editor'),

    # Report bug Url
    path('reportBug/', views.ReportBug, name='report_bug'),

    # New Safe and New Folder Url
    path('create_safe/', views.CreateSafe, name='create_safe_folder'),

    # New Safe Connected to Existing Project Folder Url
    path('connect_safe/', views.ConnectSafe, name='connect_safe_folder'),
    # Get local path
    path('getPath/', views.getLocalPath, name='get_local_path_connect'),

    # Enter Intended Dir
    path('cdDir/',views.cdIntoDir,name='enter_into_dir'),

    #Test mail
    # path('testMail/', views.TestMail, name='test_mail'),
]