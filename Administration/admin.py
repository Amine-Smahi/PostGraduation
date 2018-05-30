from django.contrib import admin
from . import models


class RecipeIngredientInline(admin.TabularInline):
    model = models.RecipeIngredient


class RecipeAdmin(admin.ModelAdmin):
    readonly_fields = ['created', 'modified', 'slug']
    list_display = ['name', 'created', 'modified']
    exclude = ['version']
    inlines = [RecipeIngredientInline]
    fieldsets = [
        ('General', {
            'fields': ['name', 'description', 'slug', 'created','modified']
        }),
        ('Categorization', {
            'fields': ['category', 'course', 'cuisine']
        }),
        ('Details', {
            'fields': ['cooking_instructions', 'preparation_time', 'cooking_time']
        }),
    ]


class CategoryAdmin(admin.ModelAdmin):
    readonly_fields = ['slug']


class CourseAdmin(admin.ModelAdmin):
    readonly_fields = ['slug']


class CuisineAdmin(admin.ModelAdmin):
    readonly_fields = ['slug']


class IngredientAdmin(admin.ModelAdmin):
    pass


class MeasurementAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.Cuisine, CuisineAdmin)
admin.site.register(models.Course, CourseAdmin)
admin.site.register(models.Category, CategoryAdmin)
admin.site.register(models.Recipe, RecipeAdmin)
admin.site.register(models.Ingredient, IngredientAdmin)
admin.site.register(models.Measurement, MeasurementAdmin)

admin.site.site_header = "PostGraduation administration"
admin.site.site_title = "PostGraduation"