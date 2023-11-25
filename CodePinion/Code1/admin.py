from django.contrib import admin
from .models import *
# Register your models here.

class SSH_DevicesAdmin(admin.ModelAdmin):
    exclude = ('host_password',) # exclude the password field


admin.site.register(Profile)
#admin.site.register(Report_Bug)
admin.site.register(SSH_Supported)
admin.site.register(SSH_Devices)
#admin.site.register(Demo)