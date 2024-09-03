from django.contrib import admin
from .models import *

class SSH_DevicesAdmin(admin.ModelAdmin):
    exclude = ('host_password',) 

admin.site.register(Profile)
# admin.site.register(Report_Bug)
# admin.site.register(SSH_Supported)
# admin.site.register(SSH_Devices)
# admin.site.register(Demo)