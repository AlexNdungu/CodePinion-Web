import paramiko
import time

#Create A Class SecureShell That Has All the methods required by ssh

class SecureShell:

    def __init__(self,hostname,port,username,password):
        
        self.hostname = hostname
        self.port = port
        self.username = username
        self.password = password

    #This method will be reponsible for ssh login
    def sshLogin(self):

        ssh_client = paramiko.SSHClient()

        #Add to known
        ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

        ssh_client.connect(hostname=self.hostname,port=self.port,username=self.username, password=self.password)

        #This variable will store the os
        what_is_os = ""

        #This dictionary has two commamd that will enable codepinion to find out if ssh device is windows or linux
        find_os = {
            'windows':'cd',
            'linux':'pwd',
        }

        find_os_out_put = {}

        #This loop passes the two commands in find_os and append the corresponding command to its os
        for os, cmd in find_os.items():

            stdin, stdout, stderr = ssh_client.exec_command(cmd)

            if stdout.readlines() != []:

                what_is_os = os 

        #Shows the os
        print(what_is_os)

        #This if statement changes command depending on whether os is windows or linux
        if what_is_os == "windows":

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

        out_put = []

        for command in commands:

            stdin, stdout, stderr = ssh_client.exec_command(command)

            out_put.append(stdout.readlines())

        #wait for 5seconds
        time.sleep(5)

        #Close Connection
        ssh_client.close()

        return out_put
    

    #Enter Dir
    def sshCdIntoDir(self):

        ssh_client = paramiko.SSHClient()