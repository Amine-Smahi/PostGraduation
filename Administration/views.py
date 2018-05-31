from rest_framework import viewsets

from . import models
from . import serializers


class DoctorantViewSet(viewsets.ModelViewSet):
    queryset = models.Doctorant.objects.all()
    serializer_class = serializers.DoctorantSerializer
    lookup_field = 'id'

class ModuleViewSet(viewsets.ModelViewSet):
    queryset = models.Module.objects.all()
    serializer_class = serializers.ModuleSerializer
    lookup_field = 'niveau'