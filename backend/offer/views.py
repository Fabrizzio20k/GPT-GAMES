from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from offer.models import Offer
from offer.serializers import OfferSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from games.models import Game


class OfferViewSet(ModelViewSet):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def perform_create(self, serializer):
        game_id = self.request.data.get('game')
        game = get_object_or_404(Game, id=game_id)
        serializer.save(seller=self.request.user, game=game)
