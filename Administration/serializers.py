from rest_framework import serializers
from . import models

class DoctorantSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Doctorant
        fields = ('id', 'nom','prenom','sexe' ,'date_naissance', 'lieu_naissance', 'addresse','email','accepted',)
        lookup_field = 'slug'