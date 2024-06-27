from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
from .views import UserView, login, ProfileViewSet, register, UpdateProfilePictureView, SearchUserView

router = DefaultRouter()
router.register(r'users', UserView, basename='user')
router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'find-user', SearchUserView, basename='find-user')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('profile-image/', UpdateProfilePictureView.as_view(), name='profile-image'),
]


