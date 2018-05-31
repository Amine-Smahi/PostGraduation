from django.contrib import admin
from . import models
# Register your models here.



class DoctorantAdmin(admin.ModelAdmin):
   pass 

admin.site.register(models.Doctorant, DoctorantAdmin)

class ModuleAdmin(admin.ModelAdmin):
   pass 

admin.site.register(models.Module, ModuleAdmin)

class RecourtAdmin(admin.ModelAdmin):
   pass 

admin.site.register(models.Recourt, ModuleAdmin)

class SujetAdmin(admin.ModelAdmin):
   pass 

admin.site.register(models.Sujet, ModuleAdmin)