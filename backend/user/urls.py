# users/urls.py
from django.urls import path
from .views import login, register , UserListCreateView , UserRetrieveUpdateDestroyView

urlpatterns = [
    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('', UserListCreateView.as_view(), name='user-list-create'),
    path('<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-detail'),
]

