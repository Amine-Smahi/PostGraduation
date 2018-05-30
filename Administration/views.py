from django.db import models
from django.template.defaultfilters import slugify
from datetime import datetime

# Create your views here.
class Doctorant(models.Model):
    doctorant_id = models.AutoField(primary_key=True)
    nationaliter = models.CharField(max_length=50, ${blank=True, null=True})
    nom = models.CharField(max_length=50, ${blank=True, null=True})
    prenom = models.CharField(max_length=50, ${blank=True, null=True})
    sexe = models.CharField(max_length=10, ${blank=True, null=True})
    date_naissance = models.DateTimeField()
    lieu_naissance = models.CharField(max_length=l00, ${blank=True, null=True})
    addresse = models.CharField(max_length=100, ${blank=True, null=True})
    email = models.CharField(max_length=50, ${blank=True, null=True})
    telephone = models.CharField(max_length=15, ${blank=True, null=True})
    nom_prenom_mere = models.CharField(max_length=50, ${blank=True, null=True})
    nom_pere = models.CharField(max_length=50, ${blank=True, null=True})

    def __str__(self):
        return self.nom_pere

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)

        super(Doctorant, self).save(*args, **kwargs)

    class Meta:
        ordering = ['name']