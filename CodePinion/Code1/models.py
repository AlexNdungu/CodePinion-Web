from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

.

# Here I will create the tables in the databases

#User Profile
class Profile(models.Model):

    #One profile owned by one user
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    #The Profile class attributes
    profile_id = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=50, verbose_name='Full Name')

    bio = models.TextField(verbose_name='Bio')
    company = models.CharField(max_length=20, verbose_name='Company')
    location = models.TextField(verbose_name='Location')
    email = models.URLField(max_length = 200, verbose_name='Email')
    website = models.URLField(max_length = 200, verbose_name='Website')

    profile_pic = models.ImageField(upload_to = 'Media/Profiles', verbose_name='Profile Picture')

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.full_name

    @property
    def profile_url(self):
        if self.profile_pic and hasattr(self.profile_pic, 'url'):
            return self.profile_pic.url   



#Supported Devices
class SSH_Supported(models.Model):

    os_name = models.CharField(max_length=10, verbose_name='OS Name')
    os_description = models.TextField(verbose_name='OS Description')
    os_icon = models.TextField(verbose_name='OS Icon Code')

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.os_name


#SSH device model
class SSH_Devices(models.Model):

    #Owner of these devices
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, verbose_name='Device Owner')

    #The os of the device
    device_os = models.ForeignKey(SSH_Supported, on_delete=models.CASCADE, verbose_name='Device OS')

    host = models.CharField(max_length=35, verbose_name='Host Name')
    host_name = models.CharField(max_length=20, verbose_name='Device Name')
    host_port = models.IntegerField(verbose_name='Port Number', default=22)
    host_username = models.CharField(max_length=20, verbose_name='Host Username')
    host_password = models.CharField(max_length=128, verbose_name='Host Password')

    #The last time user was connected to the device
    last_connected = models.DateTimeField(verbose_name='Lastly Connected')

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.device_name
    
    #Saving the password
    def save(self, *args, **kwargs):
        self.host_password = make_password(self.host_password)
        super().save(*args, **kwargs)




#Programming languages models
# class Language(models.Model):

#     lang_id = models.AutoField(primary_key=True)

#     lang_name = models.CharField(max_length=20, verbose_name='Language Name')
#     lang_icon = models.ImageField(upload_to='Languages', verbose_name='Language Icon')
#     lang_desc = models.TextField(verbose_name='Language Description')

#     update = models.DateTimeField(auto_now=True)
#     created = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return self.lang_name

#     @property
#     def language_url(self):
#         if self.lang_icon and hasattr(self.lang_icon, 'url'):
#             return self.lang_icon.url


# #Safe Model
# class Safe(models.Model):

#     safe_id = models.AutoField(primary_key=True)

#     profile = models.ForeignKey(Profile, on_delete=models.CASCADE, verbose_name='User Profile')

#     safe_name = models.CharField(max_length=20, verbose_name='Safe Name')

#     #Path to Project
#     path = models.TextField(verbose_name='Project Path')

#     languages = models.ManyToManyField(Language, blank=True)

#     #privacy status
#     privacy_status = models.BooleanField(default=False, verbose_name='Privacy Status')
#         #True = Private
#         #False = Public

#     #watchers
#     #stars

#     #Deleted Safe
#     #delete_safe = models.BooleanField(default=False, verbose_name='Deleted Safe Status')

#     update = models.DateTimeField(auto_now=True)
#     created = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return self.safe_name



# # PLANNER - (objectves & tasks)

# #Objectives Models
# class Objective(models.Model):

#     obj_id = models.AutoField(primary_key=True)

#     safe = models.ForeignKey(Safe, on_delete=models.CASCADE, verbose_name='Safe')

#     obj_desc = models.TextField(verbose_name='Objective Description')
#     #due_Date
#     #remind_date

#     #status
#     status = models.BooleanField(default=False, verbose_name='Objective status')

#     update = models.DateTimeField(auto_now=True)
#     created = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return self.obj_desc
    

# #Tasks Models
# class Task(models.Model):

#     task_id = models.AutoField(primary_key=True)

#     #The objective this task belongs to
#     objective = models.ForeignKey(Objective, on_delete=models.CASCADE, verbose_name='Objective')

#     task_desc = models.TextField(verbose_name='Task Description')
#     #due_Date
#     #remind_date

#     #status
#     status = models.BooleanField(default=False, verbose_name='Task status')

#     update = models.DateTimeField(auto_now=True)
#     created = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return self.task_desc



# #Folders Model
# class Folder(models.Model):

#     folder_id = models.AutoField(primary_key=True)

#     #Safe it is in
#     safe = models.ForeignKey(Safe, on_delete=models.CASCADE, verbose_name='Safe')

#     folder_name = models.CharField(max_length=20, verbose_name='Folder Name')

#     #Path to Folder
#     path = models.TextField(verbose_name='Folder Path')

#     #Tree Details (hierarchy)
#     #Parent folder
#     folder_parent = models.ForeignKey('self', on_delete=models.CASCADE, verbose_name='Parent Folder')

#     #Childern Folders
#     children_folders = models.ManyToManyField('self',blank=True)

#     #Children files
#     #children_files = models.ManyToManyField(File,blank=True)

#     #Tasks in a folder
#     tasks = models.ManyToManyField(Task, blank=True)

#     #Deleted folder
#     #delete_folder = models.BooleanField(default=False, verbose_name='Deleted Folder Status')

#     update = models.DateTimeField(auto_now=True)
#     created = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return self.folder_name


# #File Model
# class File(models.Model):

#     file_id = models.AutoField(primary_key=True)

#     file_name = models.CharField(max_length=20, verbose_name='File Name')    
#     language = models.ForeignKey(Language, on_delete=models.CASCADE, verbose_name='File Language')

#     #Path to file
#     path = models.TextField(verbose_name='File Path')

#     #Commit details
#     version = models.TextField(verbose_name='File Version')
#     hash_detail = models.TextField(verbose_name='File Hash')
#     file_predecessor = models.ForeignKey('self',on_delete=models.CASCADE, verbose_name='File Predecessor')

#     #Folder parent
#     folder_parent = models.ForeignKey(Folder, on_delete=models.CASCADE, verbose_name='Parent Folder')

#     #Tasks in a file
#     tasks = models.ManyToManyField(Task, blank=True)

#     #Deleted File
#     #delete_file = models.BooleanField(default=False, verbose_name='Deleted File Status')

#     update = models.DateTimeField(auto_now=True)
#     created = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return self.file_name # Concat With Version Later