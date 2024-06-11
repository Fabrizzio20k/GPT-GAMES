from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shopping_car.views import ShoppingCarViewSet

router = DefaultRouter()
router.register(r'shoppingcars', ShoppingCarViewSet, basename='shoppingcar')

urlpatterns = [
    path('', include(router.urls)),
]