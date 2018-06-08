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

class ReinscriptionAdmin(admin.ModelAdmin):
   pass 

admin.site.register(models.Reinscription, ModuleAdmin)

class InscriptionAdmin(admin.ModelAdmin):
   pass 

admin.site.register(models.Inscription, ModuleAdmin)

class EnseignantAdmin(admin.ModelAdmin):
   pass 

admin.site.register(models.Enseignant, ModuleAdmin)

class PassageGradeAdmin(admin.ModelAdmin):
   pass 

admin.site.register(models.PassageGrade, ModuleAdmin)

