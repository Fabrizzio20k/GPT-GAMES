from rest_framework.decorators import api_view, permission_classes, authentication_classes

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import permissions, viewsets, authentication
from games.api import get_game_info_api, get_games, get_game_by_name

from games.models import Game
from .serializers import GameSerializer
from offer.serializers import OfferSerializer
from offer.models import Offer
from rest_framework import status


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([authentication.TokenAuthentication])
def create_game_with_offer(request):
    game_id = request.data.get('id')
    game_name = request.data.get('name')

    game, created = Game.objects.get_or_create(id=game_id, defaults={'name': game_name})

    if created:

        game_serializer = GameSerializer(instance=game, context={'request': request})
    else:
        game_serializer = GameSerializer(instance=game, data={'name': game_name}, partial=True)
        if game_serializer.is_valid():
            game_serializer.save()
        game_serializer = GameSerializer(instance=game)  # Actualizar el serializador después de guardar

    offer_data = {
        'description': request.data.get('description', "Default description"),
        'gamekey': request.data.get('gamekey', ""),
        'price': request.data.get('price', 0),
        'discount': request.data.get('discount', 0)
    }

    offer = Offer.objects.create(**offer_data, game=game, seller=request.user)

    offer_serializer = OfferSerializer(instance=offer, context={'request': request})

    return Response({
        "offer_data": offer_serializer.data,
        "game_data": game_serializer.data
    }, status=status.HTTP_201_CREATED)


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
