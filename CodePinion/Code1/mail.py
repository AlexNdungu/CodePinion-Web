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
def Demo_Invite_Mail():
    
    connection = get_connection()
    connection.open()
    emails = []
    template = get_template('Mail/welcome.html')
    from_email = settings.EMAIL_HOST_USER
    all_profiles = models.Profile.objects.all()

    # Loop through all the profiles
    for profile in all_profiles:
        # Create email message
        email_message = EmailMessage(
            subject='Invitation to New Demo',
            body=template.render({'username': profile.full_name}),
            to=[profile.user.email],
            from_email=from_email,
            # content_type='text/html'
        )

        emails.append(email_message)

    connection.send_messages(emails)
    connection.close()
