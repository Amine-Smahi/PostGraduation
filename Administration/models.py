from django.db import models
from django.template.defaultfilters import slugify
from datetime import datetime

# Create your views here.
class Doctorant(models.Model):
    nationaliter = models.CharField(max_length=50,null=False)
    nom = models.CharField(max_length=50,null=False)
    prenom = models.CharField(max_length=50,null=False)
    sexe = models.CharField(max_length=10,null=False)
    date_naissance = models.DateField()
    lieu_naissance = models.CharField(max_length=100,null=False)
    addresse = models.CharField(max_length=100,null=False)
    email = models.CharField(max_length=50,null=False)
    telephone = models.CharField(max_length=15,null=False)
    nom_prenom_mere = models.CharField(max_length=50,null=False)
    nom_pere = models.CharField(max_length=50,null=False)
    accepted = models.BooleanField(default=False)
    slug = models.SlugField()

    def __str__(self):
        return self.nom

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.nom)

        super(Doctorant, self).save(*args, **kwargs)

    class Meta:
        ordering = ['nom']


class Module(models.Model):
    nom = models.CharField(max_length=50)
    niveau = models.CharField(max_length=10)
    slug = models.SlugField()

    def __str__(self):
        return self.nom

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.nom)

        super(Module, self).save(*args, **kwargs)

    class Meta:
        ordering = ['nom']

class Recourt(models.Model):
    doctorant = models.ForeignKey(Doctorant, related_name='recours', on_delete=models.CASCADE)
    sujet = models.CharField(max_length=50)
    message = models.CharField(max_length=2550)
    accepted = models.BooleanField(default=False)

    class Meta:
        unique_together = ('doctorant', 'sujet')
        ordering = ['sujet']
    
    def __unicode__(self):
        return '%s: %s' % (self.sujet, self.message)


class Sujet(models.Model):
    titre = models.CharField(max_length=50)
    description = models.TextField()
    accepted = models.BooleanField(default=False)
    slug = models.SlugField()

    def __str__(self):
        return self.titre

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.titre)

        super(Sujet, self).save(*args, **kwargs)

    class Meta:
        ordering = ['titre']