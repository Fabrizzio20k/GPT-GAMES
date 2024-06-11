from django.urls import path , include
from rest_framework.routers import DefaultRouter
from review.views import ReviewViewSet

router = DefaultRouter()
router.register(r'reviews', ReviewViewSet , basename='review')
urlpatterns = [
    path('', include(router.urls)),
]