from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register(r'doctorant', views.DoctorantViewSet)
router.register(r'module', views.ModuleViewSet)
router.register(r'recourt', views.RecourtViewSet)
router.register(r'sujet', views.SujetViewSet)
router.register(r'reinscription', views.ReinscriptionViewSet)
router.register(r'inscription', views.InscriptionViewSet)
router.register(r'enseignant', views.EnseignantViewSet)
router.register(r'passagegrade', views.PassageGradeViewSet)
"""
router.register(r'inscription', views.RecipeViewSet)
router.register(r'reinscription', views.CourseViewSet)
router.register(r'recourt', views.CuisineViewSet)
router.register(r'emploitDuTemp', views.CategoryViewSet)
router.register(r'Sujet', views.CategoryViewSet)
router.register(r'listEtudiant', views.CategoryViewSet)
router.register(r'pvSoutenance', views.CategoryViewSet)
"""
urlpatterns = [
    path('', include(router.urls)),
]