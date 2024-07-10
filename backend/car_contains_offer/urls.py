from django.urls import path, include
from rest_framework.routers import DefaultRouter
from car_contains_offer.views import CarContainsOfferViewSet

router = DefaultRouter()
router.register(r'carcontainsoffers', CarContainsOfferViewSet, basename='carcontainsoffer')

urlpatterns = [
    path('', include(router.urls)),
]