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
    
    # Create and open a connection SMLP
    connection = get_connection(fail_silently=False)
    connection.open()

    template = get_template('Mail/welcome.html')
    from_email = settings.EMAIL_HOST_USER

    # Get all the users
    all_profiles = models.Profile.objects.all()

    # Loop through all the profiles
    for profile in all_profiles:
        # Create Email Messages
        msg = EmailMessage(
            'Invitation to New Demo', 
            template.render({'username': profile.full_name}), 
            from_email, 
            [profile.user.email],
            connection=connection,
        )
        msg.content_subtype = "html"  # Main content is now text/html
        msg.send()

    # Close the connection
    connection.close()
