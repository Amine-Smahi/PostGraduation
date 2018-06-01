from rest_framework import serializers
from . import models


class RecourtSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Recourt
        fields = ('doctorant','sujet','message','accepted')

class ReinscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Reinscription
        fields = ('doctorant','intitulerPostGrade','intitulerSujet','diplomeGraduation','nomEncadreur','nomCoEncadreur','dateRinscription')

class DoctorantSerializer(serializers.ModelSerializer):
    recours = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='recourt-detail'
    )
    reinscriptions = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='reinscription-detail'
    )

    class Meta:
        model = models.Doctorant
        fields = ('id', 'nom','prenom','sexe' ,'date_naissance', 'lieu_naissance', 'addresse','email','accepted','reinscriptions','recours')

class ModuleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Module
        fields = ('nom','niveau')

class SujetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Sujet
        fields = ('id','titre','description','accepted')