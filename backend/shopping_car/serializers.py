from rest_framework import serializers
from .models import ShoppingCar
from offer.serializers import OfferSerializer


class ShoppingCarSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    offers = OfferSerializer(many=True, read_only=True)

    class Meta:
        model = ShoppingCar
        fields = ['id', 'owner', 'offers']