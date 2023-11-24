from django.contrib.auth.models import User
from .resorce import Create_User_Signal
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
#
from .models import Demo
from .mail import Mailer
from django.dispatch import receiver
from django.db.models.signals import m2m_changed, pre_save,post_save


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
                #Create_User_Signal(user=user)

                # Call the super method to execute the default save_user logic
                super().save_user(request, sociallogin, form)

                #Return the user
                return user



# Function that send email to users when they are created
@receiver(post_save, sender=User)
def Welcome_User_Signal(sender,instance,created, **kwargs):

    if created:
        # Call the create user function
        new_user = Create_User_Signal(user=instance)

        # Instanciate the Mailer class
        subject = 'Welcome to CodePinion'
        template_path = 'Mail/welcome.html'
        mailer = Mailer(subject,template_path)
        # Get the instance username and email
        username = new_user.username
        email = new_user.email
        # Call the Send_Mail_To_User method
        mailer.Send_Mail_To_User(full_name=username,to_email=email)


# Function that signals sending email to users when demo is created
@receiver(pre_save, sender=Demo)
def Demo_Invite_Signal(sender, instance, **kwargs):
    # Get the instance before saving
    before_instance = Demo.objects.get(demo_name = instance.demo_name)
    # Send inivitation for the Demo
    if before_instance.demo_invite_sent == False and instance.demo_invite_sent == True:

        # Instanciate the Mailer class
        subject = 'Demo Invitation' + ' : ' + instance.demo_name
        template_path = instance.demo_html_path
        mailer = Mailer(subject,template_path)
        # Call the Send_Mail_To_All method
        mailer.Send_Mail_To_All()


# Function that signals sending instructions to users when they join the demo
@receiver(m2m_changed, sender=Demo.demo_users.through)
def Profile_Join_Demo(sender, instance, action,model,pk_set, **kwargs):
    if action == 'post_add':
        # Get the profile and email
        profile_id = next(iter(pk_set))
        the_profile = model.objects.get(profile_id=profile_id)
        profile_email = the_profile.user.email
        # Instanciate the Mailer class
        subject = 'Welcome to ' + instance.demo_name
        template_path = 'Mail/demo_instructions.html'
        mailer = Mailer(subject,template_path)
        # Call the Send_Mail_To_User method
        mailer.Send_Mail_To_User(full_name=the_profile.full_name,to_email=profile_email)
        