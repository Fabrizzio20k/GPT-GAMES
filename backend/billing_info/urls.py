from django.urls import path, include
from rest_framework.routers import DefaultRouter
from billing_info.views import BillingInfoViewSet

router = DefaultRouter()
router.register(r'billinginfo', BillingInfoViewSet, basename='billinginfo')

urlpatterns = [
    path('', include(router.urls)),
]