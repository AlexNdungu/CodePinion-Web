import paramiko
import time
from datetime import datetime

from . import models
from django.contrib.auth.models import User
from .generate import UserGen


#Create A Class SecureShell That Has All the methods required by ssh

class SecureShell:

    def __init__(self,hostname,port,username,password,profile):
        
        self.hostname = hostname
        self.port = port
        self.username = username
        self.password = password
        self.profile = profile

    #Save ssh device
    def save_device(self,os):

        #Get the os
        device_os = models.SSH_Supported.objects.get(os_name = os)

        #Create a instance Device for the profile
        ssh_device = models.SSH_Devices(
            profile = self.profile,
            device_os = device_os,
            host = self.hostname,
            host_name = self.hostname,
            host_port = self.port,
            host_username = self.username,
            host_password = self.password,
            last_connected = datetime.now()
        )

        #Save the device
        ssh_device.save()


    #This method will be reponsible for ssh login
    def sshLogin(self):

        try:

            ssh_client = paramiko.SSHClient()

            #Add to known
            ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

            ssh_client.connect(hostname=self.hostname,port=self.port,username=self.username, password=self.password)

            #This variable will store the os
            what_is_os = ""

            #This dictionary has two commamd that will enable codepinion to find out if ssh device is windows or linux
            find_os = {
                'Windows':'cd',
                'Linux':'pwd',
            }

            #This loop passes the two commands in find_os and append the corresponding command to its os
            for os, cmd in find_os.items():

                stdin, stdout, stderr = ssh_client.exec_command(cmd)

                if stdout.readlines() != []:

                    what_is_os = os 

            #This if statement changes command depending on whether os is windows or linux
            if what_is_os == "Windows":

                #Windows
                commands = [
                    'cd',
                    'dir /B /AD'
                ]

            else:

                #Linux
                commands = [
                    'pwd',
                    'ls'
                ]

            #This list will hold all the outputs
            out_put = []

            #First append the os returned
            out_put.append(what_is_os)

            for command in commands:

                stdin, stdout, stderr = ssh_client.exec_command(command)

                out_put.append(stdout.readlines())

            #wait for 5seconds
            time.sleep(5)

            #Close Connection
            ssh_client.close()

            #Save this new device
            if models.SSH_Devices.objects.filter(host_name = self.hostname).exists():

                pass

            else:

                self.save_device(what_is_os)

            return out_put
    
        except paramiko.ssh_exception.AuthenticationException:

            return 'Error'




#Create User Signal
def Create_User_Signal(user):

    #Create a profile for the user
    profile = models.Profile(user=user)
    #Save the profile
    profile.save()

    #The username to be saved
    suggest_username = ''

    #Get the instance of user created 
    new_user_email = user.email

    #Strip the email
    stripped_mail = new_user_email.split('@')[0]

    #Check if the an email exists matching stripped mail
    if User.objects.filter(username=stripped_mail).exists():

        #Get the newly craeted profile id
        profile_id = str(profile.profile_id)
        #Create a new username with stripped mail and profile id
        new_username = stripped_mail + profile_id

        if User.objects.filter(username=new_username).exists():

            #count the numebr of profiles 
            profile_count = models.Profile.objects.count()
            #
            profile_count = profile_count + 1000
            #Get a list of existing usernames
            usernames = User.objects.values_list("username")
            # Convert the QuerySet to a list
            usernames = list(usernames)

            #initialise the UserName Generator Class
            username_gen = UserGen(new_user_email,profile_count)
            #Call the GenMoreName method
            generated_username = username_gen.GenMoreName(1,usernames)[0]

            #Assign the suggested_username to generated_username
            suggest_username = generated_username

        else:

            #Assign the suggested name to new_username
            suggest_username = new_username

    else:

        #Assign the suggested name to stripped_mail
        suggest_username = stripped_mail  

    #Change username from email to suggest_username
    user.username = suggest_username
    #Now give this profile a full name
    profile.full_name = suggest_username

    # Save the changes to the database
    user.save()
    profile.save()

