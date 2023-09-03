from allauth.account.signals import user_signed_up
from . import models
from django.dispatch import receiver
from .resorce import Create_User_Signal
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.utils.http import url_has_allowed_host_and_scheme


# @receiver(user_signed_up)
# def google_auth_username(request, **kwargs):

#     #Get the user instance created
#     user = kwargs['user']

#     #Call create user function
#     Create_User_Signal(user=user)


# Create an class adapter that customises user registration

class RegisterAdapter(DefaultSocialAccountAdapter):

    def save_user(self, request, sociallogin, form=None):

        # Get the user from the social login
        user = sociallogin.user

        # Set username to email
        user.username = user.email

        # Save the user
        user.save()

        # Call create user function
        Create_User_Signal(user=user)

        # Call the super method to execute the default save_user logic
        super().save_user(request, sociallogin, form=form)

        #Return the user
        return user
    
