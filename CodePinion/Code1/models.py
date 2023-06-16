from django.db import models
from django.contrib.auth.models import User


# Create your models here.

# Here I will create the tables in the databases

#User Profile
class Profile(models.Model):

    #One profile owned by one user
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    #The Profile class attributes
    profile_id = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=20, verbose_name='Full Name')

    bio = models.TextField(verbose_name='Bio')
    location = models.TextField(verbose_name='Location')
    email = models.URLField(max_length = 200, verbose_name='Email')
    website = models.URLField(max_length = 200, verbose_name='Website')

    profile_pic = models.ImageField(upload_to = 'profiles')

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.full_name

    @property
    def profile_url(self):
        if self.profile_pic and hasattr(self.profile_pic, 'url'):
            return self.profile_pic.url  

    @property
    def info_url(self):
        if self.info_picture and hasattr(self.info_picture, 'url'):
            return self.info_picture.url   


#Programming languages models
class Language(models.Model):

    lang_id = models.AutoField(primary_key=True)

    lang_name = models.CharField(max_length=20, verbose_name='Tag')
    lang_icon = models.ImageField(upload_to='Tags', verbose_name='Language Icon')
    lang_desc = models.TextField(verbose_name='Language Description')

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.lang_name

    @property
    def language_url(self):
        if self.lang_icon and hasattr(self.lang_icon, 'url'):
            return self.lang_icon.url


# PLANNER - (objectves & tasks)

#Objectives Models
class Objective(models.Model):

    obj_id = models.AutoField(primary_key=True)

    obj_desc = models.TextField(verbose_name='Objective Description')
    #due_Date
    #remind_date

    #status
    status = models.BooleanField(default=False, verbose_name='Objective status')

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)



#Tasks Models
class Task(models.Model):

    task_id = models.AutoField(primary_key=True)

    #The objective this task belongs to
    objective = models.ForeignKey(Objective, on_delete=models.CASCADE, verbose_name='Objective')

    task_desc = models.TextField(verbose_name='Task Description')
    #due_Date
    #remind_date

    #status
    status = models.BooleanField(default=False, verbose_name='Task status')

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)




#Folders Model
class Folder(models.Model):

    folder_id = models.AutoField(primary_key=True)

    #Safe it is in
    #safe = models.ForeignKey(Safe, on_delete=models.CASCADE, verbose_name='Safe')

    folder_name = models.CharField(max_length=20, verbose_name='Folder Name')

    #Tree Details (hierarchy)
    #Parent folder
    parent = models.ForeignKey('self', on_delete=models.CASCADE, verbose_name='Parent Folder')

    #Childern Folders
    children_folders = models.ManyToManyField('self',blank=True)

    #Children files
    #children_files = models.ManyToManyField(File,blank=True)

    #Tasks in a folder
    tasks = models.ManyToManyField(Task, blank=True)

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)