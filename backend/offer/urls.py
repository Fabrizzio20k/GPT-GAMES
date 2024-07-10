from django.urls import path, include
from rest_framework.routers import DefaultRouter
from offer.views import OfferViewSet

router = DefaultRouter()
router.register(r'offers', OfferViewSet, basename='offer')

urlpatterns = [
    path('', include(router.urls)),
]