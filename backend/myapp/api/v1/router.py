from rest_framework.routers import DefaultRouter

from .viewsets import ProductViewSet, GalleryViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'gallery', GalleryViewSet)

urlpatterns = router.urls
