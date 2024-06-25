from rest_framework.decorators import api_view, permission_classes, authentication_classes

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import permissions, viewsets, authentication
from games.api import get_game_info_api, get_games, get_game_by_name

from games.models import Game
from .serializers import GameSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def game_info(request, id):
    data = get_game_info_api(id)
    return Response(data)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def game_by_name(request):
    name = request.query_params.get('name')
    if not name:
        return Response({"error": "Missing 'name' query parameter"}, status=400)

    data = get_game_by_name(name)
    return Response(data)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([authentication.TokenAuthentication])
def get_all_games(request):
    data = get_games()
    return Response(data)