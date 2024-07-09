from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from django.db import IntegrityError
from rest_framework import status
from rest_framework.exceptions import ValidationError

from shopping_car.models import ShoppingCar
from shopping_car.serializers import ShoppingCarSerializer

from offer.models import Offer

from rest_framework.decorators import action


class ShoppingCarViewSet(ModelViewSet):
    queryset = ShoppingCar.objects.all()
    serializer_class = ShoppingCarSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    @action(detail=True, methods=['post'], url_path='add-offer/(?P<offer_id>\d+)')
    def add_offer(self, request, pk=None, offer_id=None):
        shopping_car = self.get_object()
        try:
            offer = Offer.objects.get(id=offer_id)
            shopping_car.offers.add(offer)
            shopping_car.save()
            return Response({'status': 'offer added'}, status=status.HTTP_200_OK)
        except Offer.DoesNotExist:
            return Response({'error': 'Offer not found'}, status=status.HTTP_404_NOT_FOUND)

    def perform_create(self, serializer):
        if ShoppingCar.objects.filter(owner=self.request.user).exists():
            response = {
                "error": "El usuario ya tiene un carrito de compras."
            }
            raise ValidationError(response)

        try:
            serializer.save(owner=self.request.user)
        except IntegrityError:
            response = {
                "error": "El usuario ya tiene un carrito de compras."
            }
            raise ValidationError(response)
