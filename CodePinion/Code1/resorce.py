import paramiko
import time
from datetime import datetime
from cryptography.fernet import Fernet
from . import models
from django.contrib.auth.models import User
from .generate import UserGen
class SecureShell:
    
    def __init__(self,hostname,port,username,password,profile=None):
        self.hostname = hostname
        self.port = port
        self.username = username
        self.password = password
        self.profile = profile
    
    def save_device(self,server_home,os):
        device_os = models.SSH_Supported.objects.get(os_name = os)
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
        dir_list = [dir.replace("\r", "").replace("\n", "") for dir in server_response_list]
        if current_directory is not None:
            clean_current_directory = current_directory.replace("\r", "").replace("\n", "")
        if server_response_list and current_directory:
            return dir_list, clean_current_directory
        elif current_directory is None:
            return dir_list
        else:
            return clean_current_directory
    
    def ssh_login(self):
        try:
            ssh_client = paramiko.SSHClient()
            ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            ssh_client.connect(hostname=self.hostname,port=self.port,username=self.username, password=self.password)
            what_is_os = ""
            find_os = [
                ('Windows', 'cd'),
                ('Linux', 'pwd')
            ]
            for os, cmd in find_os:
                stdin, stdout, stderr = ssh_client.exec_command(cmd)
                if stdout.readlines() != []:
                    what_is_os = os 
                    break
            print(what_is_os)
            if what_is_os == "Windows":
                commands = [
                    'cd',
                    'dir /B /AD-H'
                ]
            else:
                commands = [
                    'pwd',
                    'ls'
                ]
            out_put = []
            out_put.append(what_is_os)
            home_directory = ''
            for command in commands:
                index = commands.index(command)
                if index == 0:
                    stdin, stdout, stderr = ssh_client.exec_command(command)
                    home_directory = stdout.readlines()[0] 
                    out_put.append(home_directory)
                elif index == 1:
                    stdin, stdout, stderr = ssh_client.exec_command(command)
                    return_list = self.clean_server_response(server_response_list = stdout.readlines())
                    out_put.append(return_list)
            print(out_put)
            time.sleep(5)
            ssh_client.close()
            if models.SSH_Devices.objects.filter(host_name = self.hostname).exists():
                pass
            else:
                self.save_device(home_directory,what_is_os)
            return out_put
        except paramiko.ssh_exception.AuthenticationException:
            return 'Error'
    
    def windows_command(self,cd_path):
        try:
            ssh_client = paramiko.SSHClient()
            ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            ssh_client.connect(hostname=self.hostname,port=self.port,username=self.username, password=self.password)
            cd_entry_command = 'dir ' + '"' + cd_path + '"' + ' /B /AD-H'
            print(cd_entry_command)
            stdin, stdout, stderr = ssh_client.exec_command(cd_entry_command)
            time.sleep(5)
            ssh_client.close()
            return_list = self.clean_server_response(stdout.readlines())
            return return_list
        except paramiko.ssh_exception.AuthenticationException:
            return 'Error'
    
    def linux_command(self,cd_path):
        try:
            ssh_client = paramiko.SSHClient()
            ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            ssh_client.connect(hostname=self.hostname,port=self.port,username=self.username, password=self.password)
            cd_entry_command = "find" + " " + cd_path + " -maxdepth 1 -mindepth 1 -type d -printf '%f\n'" 
            stdin, stdout, stderr = ssh_client.exec_command(cd_entry_command)
            time.sleep(5)
            ssh_client.close()
            return_list = self.clean_server_response(stdout.readlines())
            return return_list
        except paramiko.ssh_exception.AuthenticationException:
            return 'Error' 
    
    def server_command(self,os,cd_path):
        if os == 'Windows':
            return self.windows_command(cd_path)
        elif os == 'Linux':
            return self.linux_command(cd_path)

def Create_User_Signal(user):
    profile = models.Profile(user=user)
    profile.save()
    suggest_username = ''
    new_user_email = user.email
    stripped_mail = new_user_email.split('@')[0]
    if User.objects.filter(username=stripped_mail).exists():
        profile_id = str(profile.profile_id)
        new_username = stripped_mail + profile_id
        if User.objects.filter(username=new_username).exists():
            profile_count = models.Profile.objects.count()
            profile_count = profile_count + 1000
            usernames = User.objects.values_list("username")
            usernames = list(usernames)
            username_gen = UserGen(new_user_email,profile_count)
            generated_username = username_gen.GenMoreName(1,usernames)[0]
            suggest_username = generated_username
        else:
            suggest_username = new_username
    else:
        suggest_username = stripped_mail  
    user.username = suggest_username
    profile.full_name = suggest_username
    profile.save()
    user.save()
    return user