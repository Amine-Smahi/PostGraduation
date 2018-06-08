from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register(r'doctorant', views.DoctorantViewSet)
router.register(r'module', views.ModuleViewSet)
router.register(r'recours', views.RecoursViewSet)
router.register(r'sujet', views.SujetViewSet)
router.register(r'reinscription', views.ReinscriptionViewSet)
router.register(r'inscription', views.InscriptionViewSet)
router.register(r'enseignant', views.EnseignantViewSet)
router.register(r'passagegrade', views.PassageGradeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]