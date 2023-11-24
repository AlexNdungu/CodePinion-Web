# Handling all the Mails Here
from CodePinion import settings
from django.template.loader import get_template
# Send one mail
from django.core.mail import EmailMessage,get_connection
from . import models

# Create a class for mailing
class Mailer:

    # Initialise the class
    def __init__(self,subject,template_path):
        self.subject = subject
        self.template_path = template_path
        self.from_email = settings.EMAIL_HOST_USER
        self.connection = get_connection(fail_silently=False)

    # Create email instance
    def Create_Email_Instance(self,subject,html_template,to_email):

        # Create Email Messages
        msg = EmailMessage(
            subject, 
            html_template, 
            self.from_email, 
            [to_email],
            connection=self.connection,
        )
        msg.content_subtype = "html"  # Main content is now text/html
        return msg

    # Method to send mail to all users
    def Send_Mail_To_All(self):
        # Create and open a connection SMLP
        self.connection.open()

        # Create the template
        template = get_template(self.template_path)

        # Get all the users
        all_profiles = models.Profile.objects.all()

        # Loop through all the profiles
        for profile in all_profiles:

            # Create the arguments    
            to_email = profile.user.email
            template_data = template.render({'username': profile.full_name})

            # Create Email Messages
            msg = self.Create_Email_Instance(self.subject,template_data,to_email)
            msg.send()

        # Close the connection
        self.connection.close()

    # Method to send mail to a user
    def Send_Mail_To_User(self,full_name,to_email):
        # Create and open a connection SMLP
        self.connection.open()

        # Create the template
        template = get_template(self.template_path)
        template_data = template.render(full_name)

        # Create Email Messages
        msg = self.Create_Email_Instance(self.subject,template_data,to_email)
        msg.send()

        # Close the connection
        self.connection.close()

