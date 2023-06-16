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
        

#Tasks Models
class Tasks(models.Model):

    task_id = models.AutoField(primary_key=True)

    task_desc = models.TextField(verbose_name='Task Description')
    #due_Date
    #remind_date

    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
