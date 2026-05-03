from django.contrib import admin

from .models import Gallery

@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "image_url", "created_at",)
    search_fields = ("name", "created_at",)
    list_filter = ("name", "created_at",)
