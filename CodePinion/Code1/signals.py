from allauth.account.signals import user_signed_up
from . import models
from django.dispatch import receiver
from .resorce import Create_User_Signal


@receiver(user_signed_up)
def google_auth_username(request, **kwargs):

    #Get the user instance created
    user = kwargs['user']

    #Call create user function
    Create_User_Signal(user=user)