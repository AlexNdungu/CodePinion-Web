# Handling all the Mails Here
from CodePinion import settings
from django.template.loader import render_to_string,get_template
# Send one mail
from django.core.mail import send_mail,EmailMessage,get_connection
from . import models

# Welcome Mail
def Welcome_Mail(to_username,to_email,fail_silently=False):

    # Arguments for send_mail
    subject = 'Welcome to CodePinion!'
    message = ''
    from_email = settings.EMAIL_HOST_USER
    to_email_list = [to_email]
    welcome_template = render_to_string('Mail/welcome.html', {'username': to_username})
    
    # Send the mail
    send_mail(subject, 
              message, 
              from_email, 
              to_email_list, 
              html_message=welcome_template,
              fail_silently=fail_silently)
    

# Send to all profile demo invite
def Demo_Invite_Mail(demo_name,template_path):
    
    # Create and open a connection SMLP
    connection = get_connection(fail_silently=False)
    connection.open()

    template = get_template(template_path)
    from_email = settings.EMAIL_HOST_USER
    subject = 'Demo Invitation' + ' : ' + demo_name

    # Get all the users
    all_profiles = models.Profile.objects.all()

    # Loop through all the profiles
    for profile in all_profiles:
        # Create Email Messages
        msg = EmailMessage(
            subject, 
            template.render({'username': profile.full_name}), 
            from_email, 
            [profile.user.email],
            connection=connection,
        )
        msg.content_subtype = "html"  # Main content is now text/html
        msg.send()

    # Close the connection
    connection.close()


# Create a class for mailing
class Mailer:

    # Initialise the class
    def __init__(self,subject,template_path):
        self.subject = subject
        self.template_path = template_path
        self.from_email = settings.EMAIL_HOST_USER
        self.connection = get_connection(fail_silently=False)

    # Create email instance
    def Create_Email_Instance(self,to_email,username):
        template = get_template(self.template_path)
        subject = self.subject
        from_email = self.from_email

        # Create Email Messages
        msg = EmailMessage(
            subject, 
            template.render({'username': username}), 
            from_email, 
            [to_email],
            connection=self.connection,
        )
        msg.content_subtype = "html"  # Main content is now text/html
        return msg

    # Method to send mail to all users
    def Send_Mail_To_All(self):
        # Create and open a connection SMLP
        connection = get_connection(fail_silently=False)
        connection.open()

        template = get_template(self.template_path)
        from_email = self.from_email
        subject = self.subject

        # Get all the users
        all_profiles = models.Profile.objects.all()

        # Loop through all the profiles
        for profile in all_profiles:
            # Create Email Messages
            msg = EmailMessage(
                subject, 
                template.render({'username': profile.full_name}), 
                from_email, 
                [profile.user.email],
                connection=connection,
            )
            msg.content_subtype = "html"  # Main content is now text/html
            msg.send()

        # Close the connection
        connection.close()

    # Method to send mail to a user
    def Send_Mail_To_User(self,to_email,username):
        # Create and open a connection SMLP
        connection = get_connection(fail_silently=False)
        connection.open()

        template = get_template(self.template_path)
        from_email = self.from_email
        subject = self.subject

        # Create Email Messages
        msg = EmailMessage(
            subject, 
            template.render({'username': username}), 
            from_email, 
            [to_email],
            connection=connection,
        )
        msg.content_subtype = "html"  # Main content is now text/html
        msg.send()

        # Close the connection
        connection.close()

