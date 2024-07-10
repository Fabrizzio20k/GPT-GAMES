from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from offer.models import Offer
from offer.serializers import OfferSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from games.models import Game
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from review.serializers import ReviewSerializer
from rest_framework.response import Response
from rest_framework import status

class OfferViewSet(ModelViewSet):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['game']
    search_fields = ['^game__name']

    @action(detail=True, methods=['post'], url_path='add-review')
    def add_review(self, request, pk):
        offer = self.get_object()
        serializer = ReviewSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(offer=offer, commenter=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        game_id = self.request.data.get('game')
        game = get_object_or_404(Game, id=game_id)
        serializer.save(seller=self.request.user, game=game)
