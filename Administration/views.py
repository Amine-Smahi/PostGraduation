from rest_framework import viewsets

from . import models
from . import serializers


class DoctorantViewSet(viewsets.ModelViewSet):
    """
    This endpoint provides access to recipes

    list:
    Retrieves a list of recipes stored in the database

    retrieve:
    Retrieves a single recipe

    create:
    Stores a new recipe

    destroy:
    Removes an existing recipe

    update:
    Updates an existing recipe

    partial_update:
    Updates specific fields on an existing recipe
    """
    queryset = models.Doctorant.objects.all()
    serializer_class = serializers.DoctorantSerializer
    lookup_field = 'id'