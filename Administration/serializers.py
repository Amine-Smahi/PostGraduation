from rest_framework import serializers
from . import models

class DoctorantSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Doctorant
        fields = ('doctorant_id', 'nom',)
        lookup_field = 'slug'