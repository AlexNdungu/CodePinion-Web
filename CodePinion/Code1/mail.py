from CodePinion import settings
from django.template.loader import get_template
from django.core.mail import EmailMessage,get_connection
from . import models  
class Mailer:
    
    def __init__(self,subject,template_path):
        self.subject = subject
        self.template_path = template_path
        self.from_email = f'CodePinion Developers <{settings.EMAIL_HOST_USER}>'
        self.connection = get_connection(fail_silently=False)
    
    def Create_Email_Instance(self,subject,html_template,to_email):
        msg = EmailMessage(
            subject, 
            html_template, 
            self.from_email, 
            [to_email],
            connection=self.connection,
        )
        msg.content_subtype = "html"  
        return msg
    
    def Send_Mail_To_User(self,data_dict,to_email):
        self.connection.open()
        template = get_template(self.template_path)
        template_data = template.render(data_dict)
        msg = self.Create_Email_Instance(self.subject,template_data,to_email)
        msg.send()
        self.connection.close()
    
    def Send_Mail_To_All(self):
        all_profiles = models.Profile.objects.all()
        email_list = []
        username_list = []
        for profile in all_profiles:
            email_list.append(profile.user.email)
            username_list.append(profile.full_name)
        for user_email, user_username in zip(email_list, username_list):
            username_dict = {'username':user_username}
            email = user_email
            self.Send_Mail_To_User(data_dict=username_dict,to_email=email)