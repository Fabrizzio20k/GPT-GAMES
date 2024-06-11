from rest_framework import serializers
from .models import CarContainsOffer
from shopping_car.models import ShoppingCar
from offer.models import Offer
from offer.serializers import OfferSerializer

class CarContainsOfferSerializer(serializers.HyperlinkedModelSerializer):
    shopping_car = serializers.PrimaryKeyRelatedField(queryset=ShoppingCar.objects.all())
    offer = serializers.PrimaryKeyRelatedField(queryset=Offer.objects.all())
    offer_details = OfferSerializer(source='offer', read_only=True)

    class Meta:
        model = CarContainsOffer
        fields = ('url', 'id', 'offer', 'shopping_car', 'offer_details')