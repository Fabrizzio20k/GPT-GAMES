from django.urls import path , include
from rest_framework.routers import DefaultRouter
from transaction.views import TransactionViewSet

router = DefaultRouter()
router.register(r'transactions', TransactionViewSet , basename='transaction')
urlpatterns = [
    path('', include(router.urls)),
]