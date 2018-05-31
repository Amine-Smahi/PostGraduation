from rest_framework import serializers
from . import models


class RecourtSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Recourt
        fields = ('doctorant','sujet','message','accepted')

class DoctorantSerializer(serializers.ModelSerializer):
    recours = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='recourt-detail'
    )
    
    class Meta:
        model = models.Doctorant
        fields = ('id', 'nom','prenom','sexe' ,'date_naissance', 'lieu_naissance', 'addresse','email','accepted','recours')

class ModuleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Module
        fields = ('nom','niveau')

class SujetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Sujet
        fields = ('id','titre','description','accepted')