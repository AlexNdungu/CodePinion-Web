import paramiko
import time

#Here i will set up the ssh code to connect to remote server
#Create a ssh client

def ssh_client_action():

    ssh_client = paramiko.SSHClient()

    #Add to known
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    ssh_client.connect(hostname="",username="", password="")
    stdin, stdout, stderr = ssh_client.exec_command('dir /ad /b')

    #wait for 5seconds
    time.sleep(5)

    #Close Connection
    ssh_client.close()

    return stdout.readlines()