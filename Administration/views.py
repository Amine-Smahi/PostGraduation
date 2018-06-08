from rest_framework import viewsets

from . import models
from . import serializers


class DoctorantViewSet(viewsets.ModelViewSet):
    queryset = models.Doctorant.objects.all()
    serializer_class = serializers.DoctorantSerializer

class ModuleViewSet(viewsets.ModelViewSet):
    queryset = models.Module.objects.all()
    serializer_class = serializers.ModuleSerializer
    lookup_field = 'niveau'

class RecourtViewSet(viewsets.ModelViewSet):
    queryset = models.Recourt.objects.all()
    serializer_class = serializers.RecourtSerializer
    
class SujetViewSet(viewsets.ModelViewSet):
    queryset = models.Sujet.objects.all()
    serializer_class = serializers.SujetSerializer
    lookup_field = 'id'

class ReinscriptionViewSet(viewsets.ModelViewSet):
    queryset = models.Reinscription.objects.all()
    serializer_class = serializers.ReinscriptionSerializer

class InscriptionViewSet(viewsets.ModelViewSet):
    queryset = models.Inscription.objects.all()
    serializer_class = serializers.InscriptionSerializer

class EnseignantViewSet(viewsets.ModelViewSet):
    queryset = models.Enseignant.objects.all()
    serializer_class = serializers.EnseignantSerializer

class PassageGradeViewSet(viewsets.ModelViewSet):
    queryset = models.PassageGrade.objects.all()
    serializer_class = serializers.PassageGradeSerializer
    