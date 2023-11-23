from django.contrib.auth.models import User
from .resorce import Create_User_Signal
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
#
from .models import Demo, Profile
from .mail import Demo_Invite_Mail
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save


# Create an class adapter that customises user registration
class RegisterAdapter(DefaultSocialAccountAdapter):

    # Override the save_user method
    def save_user(self, request, sociallogin, form=None):

        # Check the process is signup or signin
        if sociallogin.state.get('process') == 'signup' or sociallogin.state.get('process') == 'signin':

            # Check if user already exists
            if User.objects.filter(email=sociallogin.user.email).exists():

                # Get the user from the social login
                user = User.objects.get(email=sociallogin.user.email)

                # Check if user is authenticated using 0auth
                if user.socialaccount_set.filter(provider=sociallogin.account.provider).exists():

                    # Call the super method to execute the default save_user logic
                    super().save_user(request, sociallogin, form)

                    # Return the user
                    return user

                else:

                    # Add the social account to the user
                    sociallogin.connect(request, user)

                    # Call the super method to execute the default save_user logic
                    super().save_user(request, sociallogin, form)

                    # Return the user
                    return user
            
            else:

                # Get the user from the social login
                user = sociallogin.user

                # Set username to email
                user.username = user.email

                # Save the user
                user.save()

                # Call create user function
                Create_User_Signal(user=user)

                # Call the super method to execute the default save_user logic
                super().save_user(request, sociallogin, form)

                #Return the user
                return user


# Function that signals sending email to users when demo is created
@receiver(pre_save, sender=Demo)
def Demo_Invite_Signal(sender, instance, **kwargs):
    # Get the instance before saving
    before_instance = Demo.objects.get(demo_name = instance.demo_name)
    # Send inivitation for the Demo
    if before_instance.demo_invite_sent == False and instance.demo_invite_sent == True:
        # call the demo invite function
        Demo_Invite_Mail(demo_name=instance.demo_name,template_path=instance.demo_html_path)