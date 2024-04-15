from django.contrib.auth.models import User
from .resorce import Create_User_Signal
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from .models import Demo, Report_Bug
from .mail import Mailer
from django.dispatch import receiver
from django.db.models.signals import m2m_changed, pre_save,post_save
from django.contrib.sites.models import Site
class RegisterAdapter(DefaultSocialAccountAdapter):
    
    def save_user(self, request, sociallogin, form=None):
        if sociallogin.state.get('process') == 'signup' or sociallogin.state.get('process') == 'signin':
            if User.objects.filter(email=sociallogin.user.email).exists():
                user = User.objects.get(email=sociallogin.user.email)
                if user.socialaccount_set.filter(provider=sociallogin.account.provider).exists():
                    super().save_user(request, sociallogin, form)
                    return user
                else:
                    sociallogin.connect(request, user)
                    super().save_user(request, sociallogin, form)
                    return user
            else:
                user = sociallogin.user
                user.username = user.email
                user.save()
                super().save_user(request, sociallogin, form)
                return user

@receiver(post_save, sender=User)
def Welcome_User_Signal(sender,instance,created, **kwargs):
    if created:
        new_user = Create_User_Signal(user=instance)
        subject = 'Welcome to CodePinion'
        template_path = 'Mail/welcome.html'
        mailer = Mailer(subject,template_path)
        username_dict = {'username':new_user.username}
        email = new_user.email
        mailer.Send_Mail_To_User(data_dict=username_dict,to_email=email)

@receiver(pre_save, sender=Demo)
def Demo_Invite_Signal(sender, instance, **kwargs):
    if Demo.objects.filter(demo_name = instance.demo_name).exists():
        before_instance = Demo.objects.get(demo_name = instance.demo_name)
        if before_instance.demo_invite_sent == False and instance.demo_invite_sent == True:
            subject = 'Demo Invitation' + ' : ' + instance.demo_name
            template_path = instance.demo_html_path
            mailer = Mailer(subject,template_path)
            mailer.Send_Mail_To_All()

@receiver(m2m_changed, sender=Demo.demo_users.through)
def Profile_Join_Demo(sender, instance, action,model,pk_set, **kwargs):
    if action == 'post_add':
        profile_id = next(iter(pk_set))
        the_profile = model.objects.get(profile_id=profile_id)
        profile_email = the_profile.user.email
        subject = 'Welcome to ' + instance.demo_name
        template_path = 'Mail/demo_instructions.html'
        full_name_data = {'username': the_profile.full_name}
        mailer = Mailer(subject,template_path)
        mailer.Send_Mail_To_User(data_dict=full_name_data,to_email=profile_email)

@receiver(post_save, sender=Report_Bug)
def Report_Bug_Signal(sender, instance, created, **kwargs):
    current_site = Site.objects.get_current()
    current_site_https = 'https://' + current_site.domain
    reporter_name = instance.profile.full_name
    bug_reporter_email = instance.profile.user.email
    bug_title = instance.bug_title
    bug_desc = instance.bug_desc
    bug_screenshot = instance.bug_screenshot.url
    bug_screenshot = current_site_https + bug_screenshot
    bug_data = {'reporter_name':reporter_name,'bug_title':bug_title,'bug_desc':bug_desc,'bug_screenshot':bug_screenshot}
    if created:
        subject = 'Bug Reported' + ' : ' + bug_title
        template_path = 'Mail/bug_report.html'
        mailer = Mailer(subject,template_path)
        mailer.Send_Mail_To_User(data_dict=bug_data,to_email=bug_reporter_email)
    else:
        if instance.bug_status == True:
            subject = 'Bug Fixed' + ' : ' + bug_title
            template_path = 'Mail/bug_fixed.html'
            mailer = Mailer(subject,template_path)
            mailer.Send_Mail_To_User(data_dict=bug_data,to_email=bug_reporter_email)
        else:
            subject = 'Bug Updated' + ' : ' + bug_title
            template_path = 'Mail/bug_report.html'
            mailer = Mailer(subject,template_path)
            mailer.Send_Mail_To_User(data_dict=bug_data,to_email=bug_reporter_email)
