from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GameViewSet, game_info, get_all_games

router = DefaultRouter()
router.register(r'games', GameViewSet, basename='games')

urlpatterns = [
    path('', include(router.urls)),
    path('game/<int:id>/', game_info, name='game_info'),
    path('get_games/', get_all_games, name='get_games'),
]