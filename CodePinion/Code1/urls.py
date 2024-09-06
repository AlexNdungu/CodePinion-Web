from django.urls import path
from . import views
urlpatterns = [
    path('homeInherit/', views.HomeInherit, name='home-inherit'),
    path('', views.Landing, name='landing'),
    path('privacyPolicy/', views.PrivacyPolicy, name='privacy-policy'),
    path('termsAndConditions/', views.TermsAndConditions, name='terms-and-conditions'),
    path('upperNav/', views.UpperNav, name='upper-nav'),
    path('signup/',views.signUp, name='sign_up'),
    path('createNewUser/', views.createNewUser, name='create_new_user'),
    path('signin/',views.signIn, name='signin'),
    path('signout/',views.signOut, name='signout'),
    path('signinUser/', views.signInUser, name='signin_user'),
    path('profile/', views.Profile, name='profile'),
    path('updateProfile/', views.UpdateProfile, name='update_profile'),
    path('dash/', views.Dashboard, name='dash'),
    path('safes/', views.Safes, name='safes'),
    path('new_safe/', views.NewSafe, name='new_safe'),
    path('safe_biodata_inherit/',views.SafeBioDataInherit,name='objectives_todo'),
    path('getAllCurrentUserAccounts/', views.GetAllCurrentUserAccounts, name='get_all_current_user_accounts'),
]