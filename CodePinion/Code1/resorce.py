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

        commands = [
            'cd',
            'dir /ad /b'
        ]

        out_put = []

        for command in commands:

            stdin, stdout, stderr = ssh_client.exec_command(command)

            out_put.append(stdout.readlines())

        #wait for 5seconds
        time.sleep(5)

        #Close Connection
        ssh_client.close()

        #print(stderr.readlines())

        return out_put