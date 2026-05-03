from rest_framework.routers import DefaultRouter

from .viewsets import GalleryViewSet

router = DefaultRouter()
router.register(r'gallery', GalleryViewSet)

urlpatterns = router.urls
