from django.db import models
from django.contrib.auth.models import User
from cryptography.fernet import Fernet
from fernet_fields import EncryptedTextField
from ckeditor.fields import RichTextField 

# User Profile
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_id = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=50, verbose_name='Full Name')
    bio = models.TextField(verbose_name='Bio')
    company = models.CharField(max_length=20, verbose_name='Company')
    location = models.TextField(verbose_name='Location')
    secondary_email = models.URLField(max_length = 200, verbose_name='Secondary Email', default='Secondary Email')
    website = models.URLField(max_length = 200, verbose_name='Website')
    profile_pic = models.ImageField(upload_to = 'Profiles', verbose_name='Profile Picture')
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.full_name
    @property
    def profile_url(self):
        if self.profile_pic and hasattr(self.profile_pic, 'url'):
            return self.profile_pic.url   

# Supported Devices
class SSH_Supported(models.Model):
    os_name = models.CharField(max_length=10, verbose_name='OS Name')
    os_description = models.TextField(verbose_name='OS Description')
    os_icon = models.TextField(verbose_name='OS Icon Code')
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.os_name

# SSH device model
class SSH_Devices(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, verbose_name='Device Owner')
    device_os = models.ForeignKey(SSH_Supported, on_delete=models.CASCADE, verbose_name='Device OS')
    host = models.CharField(max_length=35, verbose_name='Host Name')
    host_name = models.CharField(max_length=20, verbose_name='Device Name')
    host_port = models.IntegerField(verbose_name='Port Number', default=22)
    host_username = models.CharField(max_length=20, verbose_name='Host Username')
    host_password = EncryptedTextField(verbose_name='Host Password')
    server_home_dir = models.TextField(verbose_name='Server Home Directory', default='/home')
    last_connected = models.DateTimeField(verbose_name='Lastly Connected')
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.host
    # Saving the password
    # def save(self, *args, **kwargs):
    #     key = Fernet.generate_key()
    #     f = Fernet(key)
    #     self.host_password = f.encrypt(self.host_password.encode())
    #     super().save(*args, **kwargs)

#Demo model, save all the demos here
class Demo(models.Model):
        demo_id = models.AutoField(primary_key=True)
        demo_name = models.CharField(max_length=35, verbose_name='Demo Name')
        demo_desc = RichTextField(verbose_name='Demo Description',default='Demo Description')
        demo_html_path = models.TextField(verbose_name='Demo Path')
        demo_users = models.ManyToManyField(Profile, blank=True)
        demo_invite_sent = models.BooleanField(default=False, verbose_name='Demo Invite')
        update = models.DateTimeField(auto_now=True)
        created = models.DateField(auto_now_add=True)
        def __str__(self):
            return self.demo_name

# Report Bug Model
class Report_Bug(models.Model):
        profile = models.ForeignKey(Profile, on_delete=models.CASCADE, verbose_name='Bug Reporter')
        bug_id = models.AutoField(primary_key=True)
        bug_title = models.TextField(verbose_name='Bug Title',default='Bug Title')
        bug_desc = RichTextField(verbose_name='Bug Description',default='Bug Description')
        bug_screenshot = models.ImageField(upload_to='Bugs', verbose_name='Bug Screenshot')
        bug_status = models.BooleanField(default=False, verbose_name='Bug Status')
        update = models.DateTimeField(auto_now=True)
        created = models.DateField(auto_now_add=True)
        def __str__(self):
            return self.bug_title

# languages models (Supported extension formats ie videos, images, code)
class Language(models.Model):
    lang_id = models.AutoField(primary_key=True)
    lang_name = models.CharField(max_length=20, verbose_name='Language Name')
    lang_icon = models.ImageField(upload_to='Languages', verbose_name='Language Icon')
    lang_color_code = models.CharField(max_length=10, verbose_name='Language Color Code',default='#ffffff')
    lang_desc = models.TextField(verbose_name='Language Description')
    lang_is_editable = models.BooleanField(default=True, verbose_name='Editable Status')
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.lang_name
    @property
    def language_url(self):
        if self.lang_icon and hasattr(self.lang_icon, 'url'):
            return self.lang_icon.url

# Safe Model
class Safe(models.Model):
    safe_id = models.AutoField(primary_key=True)
    safe_name = models.CharField(max_length=30, verbose_name='Safe Name')
    safe_owner = models.ForeignKey(Profile, on_delete=models.CASCADE, verbose_name='User Profile',related_name='safe_owner')
    safe_members = models.ManyToManyField(Profile, blank=True, verbose_name='Safe Members',related_name='safe_members')
    languages = models.ManyToManyField(Language, blank=True)
    watchers = models.ManyToManyField(Profile, blank=True,related_name='watchers')
    stars = models.ManyToManyField(Profile, blank=True,related_name='stars')
    privacy_status = models.BooleanField(default=False, verbose_name='Privacy Status')
    delete_safe = models.BooleanField(default=False, verbose_name='Deleted Safe Status')
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.profile.full_name + ' - ' + self.safe_name

# Branch Model
class Branch(models.Model):
    safe = models.ForeignKey(Safe, on_delete=models.CASCADE, verbose_name='Safe')
    branch_id = models.AutoField(primary_key=True)
    branch_name = models.CharField(max_length=30, verbose_name='Branch Name')
    branch_desc = models.TextField(verbose_name='Branch Description')
    branch_created_by = models.ForeignKey(Profile, on_delete=models.CASCADE, verbose_name='Branch Owner',related_name='branch_owner')
    delete_branch = models.BooleanField(default=False, verbose_name='Deleted Branch Status')
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.safe.safe_name + ' - ' + self.branch_name

# PLANNER - (objectves & tasks)
# Objectives Models
class Objective(models.Model):
    obj_id = models.AutoField(primary_key=True)
    obj_name = models.CharField(max_length=150, verbose_name='Objective Name')
    # obj_desc = models.TextField(verbose_name='Objective Description')
    safe = models.ForeignKey(Safe, on_delete=models.CASCADE, verbose_name='Safe')
    created_by = models.ForeignKey(Profile, on_delete=models.CASCADE, verbose_name='Created By',related_name='created_by')
    users_involved = models.ManyToManyField(Profile, blank=True, verbose_name='Users Involved',related_name='users_involved')
    due_date = models.DateField(verbose_name='Due Date')
    remind_date = models.DateField(verbose_name='Remind Date')
    progress = models.IntegerField(default=0, verbose_name='Progress')
    complete_status = models.BooleanField(default=False, verbose_name='Complete status')
    delete_objective = models.BooleanField(default=False, verbose_name='Deleted Objective Status')
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.safe.safe_name + ' - ' + self.obj_name

# Tasks Models
class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    task_name = models.CharField(max_length=150, verbose_name='Task Name')
    # task_desc = models.TextField(verbose_name='Task Description')
    objective = models.ForeignKey(Objective, on_delete=models.CASCADE, verbose_name='Objective')
    created_by = models.ForeignKey(Profile, on_delete=models.CASCADE, verbose_name='Task Owner',related_name='task_owner')
    finished_by = models.ForeignKey(Profile, on_delete=models.CASCADE, verbose_name='Task Finisher',related_name='task_finisher')
    on_which_branch = models.ForeignKey(Branch, on_delete=models.CASCADE, verbose_name='Task Branch')
    due_date = models.DateField(verbose_name='Due Date')
    remind_date = models.DateField(verbose_name='Remind Date')
    complete_status = models.BooleanField(default=False, verbose_name='Complete status')
    delete_task = models.BooleanField(default=False, verbose_name='Deleted Task Status')
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.objective.obj_name + ' - ' + self.task_name
# Folders Model
class Directory(models.Model):
    dir_id = models.AutoField(primary_key=True)
    dir_name = models.CharField(max_length=30, verbose_name='Directory Name')
    dir_path = models.TextField(verbose_name='Directory Path')
    dir_children = models.ManyToManyField('self', blank=True)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, verbose_name='Branch')
    hierarchy_level_in_branch = models.IntegerField(verbose_name='Hierarchy Level', default=0)
    is_root = models.BooleanField(default=False, verbose_name='Root Directory Status')
    delete_dir = models.BooleanField(default=False, verbose_name='Deleted Directory Status')
    all_dir_tasks = models.ManyToManyField(Task, blank=True, related_name='all_dir_tasks')
    latest_dir_task = models.ForeignKey(Task, on_delete=models.CASCADE, verbose_name='Latest Task', related_name='latest_dir_task')
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.branch.branch_name + ' - ' + self.dir_name + ' - ' + self.dir_path

# File Model
class File(models.Model):
    file_id = models.AutoField(primary_key=True)
    file_name = models.CharField(max_length=30, verbose_name='File Name')
    file_path = models.TextField(verbose_name='File Path')
    file_language = models.ForeignKey(Language, on_delete=models.CASCADE, verbose_name='Language')
    file_image_or_video = models.FileField(upload_to='Code', verbose_name='File Content')
    file_format_editable = models.BooleanField(default=True, verbose_name='Editable File Status')
    file_extension = models.CharField(max_length=10, verbose_name='File Extension')
    file_size = models.IntegerField(verbose_name='File Size', default=0)
    parent_dir = models.ForeignKey(Directory, on_delete=models.CASCADE, verbose_name='Parent Directory')
    hierarchy_level_in_branch = models.IntegerField(verbose_name='Hierarchy Level', default=0)
    delete_file = models.BooleanField(default=False, verbose_name='Deleted File Status')
    all_file_tasks = models.ManyToManyField(Task, blank=True, related_name='all_file_tasks')
    latest_file_task = models.ForeignKey(Task, on_delete=models.CASCADE, verbose_name='Latest Task',related_name='latest_file_task')
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.file_name

# line Model
class Line(models.Model):
    line_id = models.AutoField(primary_key=True)
    line_content = models.TextField(verbose_name='Line Content')
    line_number = models.IntegerField(verbose_name='Line Number', default=0)
    line_parent_file = models.ForeignKey(File, on_delete=models.CASCADE, verbose_name='Parent File')
    line_currently_on_parent_file = models.BooleanField(default=True, verbose_name='Currently on Parent File')
    line_updated_by = models.ForeignKey(Profile, on_delete=models.CASCADE, verbose_name='Updated By')
    line_deleted = models.BooleanField(default=False, verbose_name='Deleted Line Status')
    line_length = models.IntegerField(verbose_name='Line Length', default=0)
    line_size = models.IntegerField(verbose_name='Line Size', default=0)
    line_task = models.ForeignKey(Task, on_delete=models.CASCADE, verbose_name='Task Comment')
    update = models.DateTimeField(auto_now=True)
    created = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.line_id + ' - ' + self.line_number + ' - ' + self.line_parent_file.file_name