import paramiko
import time
from datetime import datetime
from cryptography.fernet import Fernet

from . import models
from django.contrib.auth.models import User
from .generate import UserGen

# Send Mail
from .mail import Welcome_Mail

# Create A Class SecureShell That Has All the methods required by ssh

class SecureShell:

    def __init__(self,hostname,port,username,password,profile=None):
        
        self.hostname = hostname
        self.port = port
        self.username = username
        self.password = password
        self.profile = profile

    # Save ssh device
    def save_device(self,server_home,os):

        # Get the os
        device_os = models.SSH_Supported.objects.get(os_name = os)

        # Create a instance Device for the profile
        ssh_device = models.SSH_Devices(
            profile = self.profile,
            device_os = device_os,
            host = self.hostname,
            host_name = self.hostname,
            host_port = self.port,
            host_username = self.username,
            host_password = self.password,
            server_home_dir = server_home,
            last_connected = datetime.now()
        )

        ssh_device.save()


    def clean_server_response(self,server_response_list=[],current_directory=None):

        # Clean the return by
        dir_list = [dir.replace("\r", "").replace("\n", "") for dir in server_response_list]

        if current_directory is not None:
            # Clean the current path
            clean_current_directory = current_directory.replace("\r", "").replace("\n", "")

        if server_response_list and current_directory:
            return dir_list, clean_current_directory
        elif current_directory is None:
            return dir_list
        else:
            return clean_current_directory
    

    # This method will be reponsible for ssh login
    def ssh_login(self):

        try:

            ssh_client = paramiko.SSHClient()

            ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

            ssh_client.connect(hostname=self.hostname,port=self.port,username=self.username, password=self.password)

            # This variable will store the os
            what_is_os = ""

            find_os = [
                ('Windows', 'cd'),
                ('Linux', 'pwd')
            ]

            # This loop passes the two commands in find_os and append the corresponding command to its os
            for os, cmd in find_os:

                stdin, stdout, stderr = ssh_client.exec_command(cmd)

                if stdout.readlines() != []:

                    what_is_os = os 
                    break

            print(what_is_os)
            # This if statement changes command depending on whether os is windows or linux
            if what_is_os == "Windows":

                #Windows
                commands = [
                    'cd',
                    'dir /B /AD-H'
                ]

            else:

                #Linux
                commands = [
                    'pwd',
                    'ls'
                ]

            # This list will hold all the outputs
            out_put = []

            # First append the os returned
            out_put.append(what_is_os)

            # Define home directory
            home_directory = ''

            for command in commands:

                index = commands.index(command)

                if index == 0:
                        
                    stdin, stdout, stderr = ssh_client.exec_command(command)

                    home_directory = stdout.readlines()[0] 

                    # Clean the current directory 
                    # home_directory = self.clean_server_response(current_directory = stdout.readlines())

                    # Append directory to out_put
                    out_put.append(home_directory)

                elif index == 1:

                    stdin, stdout, stderr = ssh_client.exec_command(command)

                    # Clean the return list
                    return_list = self.clean_server_response(server_response_list = stdout.readlines())

                    # Append directory to out_put
                    out_put.append(return_list)


            print(out_put)

            time.sleep(5)

            ssh_client.close()

            # Save this new device
            if models.SSH_Devices.objects.filter(host_name = self.hostname).exists():

                pass

            else:

                self.save_device(home_directory,what_is_os)

            return out_put
    
        except paramiko.ssh_exception.AuthenticationException:

            return 'Error'


    # This method will be pass Windows commands
    def windows_command(self,cd_path):

        try:

            ssh_client = paramiko.SSHClient()

            ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

            ssh_client.connect(hostname=self.hostname,port=self.port,username=self.username, password=self.password)

            # This variable will store the cd command to enter into a new directory
            cd_entry_command = 'dir ' + '"' + cd_path + '"' + ' /B /AD-H'

            print(cd_entry_command)

            stdin, stdout, stderr = ssh_client.exec_command(cd_entry_command)

            time.sleep(5)

            ssh_client.close()

            # Clean the return list
            return_list = self.clean_server_response(stdout.readlines())

            return return_list
        
        except paramiko.ssh_exception.AuthenticationException:

            return 'Error'


    # This method will be pass linux commands
    def linux_command(self,cd_path):

        try:

            ssh_client = paramiko.SSHClient()

            ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

            ssh_client.connect(hostname=self.hostname,port=self.port,username=self.username, password=self.password)

            # This variable will store the cd command to enter into a new directory
            cd_entry_command = "find" + " " + cd_path + " -maxdepth 1 -mindepth 1 -type d -printf '%f\n'" #find /home/user1/Documents -maxdepth 1 -mindepth 1 -type d -printf '%f\n'


            stdin, stdout, stderr = ssh_client.exec_command(cd_entry_command)

            time.sleep(5)

            ssh_client.close()

            # Clean the return list
            return_list = self.clean_server_response(stdout.readlines())

            return return_list
        
        except paramiko.ssh_exception.AuthenticationException:

            return 'Error' 


    # This method will be call either windows_command or linux_command
    def server_command(self,os,cd_path):

        if os == 'Windows':

            return self.windows_command(cd_path)

        elif os == 'Linux':

            return self.linux_command(cd_path)

    




# Create User Signal
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
    profile.save()
    user.save()

    # Send Welcome Mail
    #Welcome_Mail(user.username,user.email)

    return user