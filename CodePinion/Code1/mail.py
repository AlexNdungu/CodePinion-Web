# Handling all the Mails Here
from CodePinion import settings
from django.template.loader import render_to_string
# Send one mail
from django.core.mail import send_mail

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