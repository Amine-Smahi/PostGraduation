from django.contrib import admin
from . import models
# Register your models here.



class DoctorantAdmin(admin.ModelAdmin):
   pass 

admin.site.register(models.Doctorant, DoctorantAdmin)