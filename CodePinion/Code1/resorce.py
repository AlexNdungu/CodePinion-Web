#from PyQt5.QtWidgets import QFileDialog, QApplication, QSystemTrayIcon
import paramiko
import sys
import time

#Toggle Windows Conversation Box ro select path
# def toggleWindow():

#     app = QApplication(sys.argv)

#     directory = QFileDialog.getExistingDirectory(None, "Select Directory")

#     return directory


#Here i will set up the ssh code to connect to remote server
#Create a ssh client

def ssh_client_action():

    ssh_client = paramiko.SSHClient()

    #Add to known
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    ssh_client.connect(hostname="192.168.100.9",username="user", password="joyce2001")
    stdin, stdout, stderr = ssh_client.exec_command('dir /ad /b')

    #wait for 5seconds
    time.sleep(5)

    #Close Connection
    ssh_client.close()

    return stdout.readlines()