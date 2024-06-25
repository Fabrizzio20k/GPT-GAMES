from rest_framework import serializers

from review.models import Review
from .models import Offer
from games.models import Game
from review.serializers import ReviewSerializer

class OfferSerializer(serializers.ModelSerializer):
    seller = serializers.ReadOnlyField(source='seller.username')
    game = serializers.PrimaryKeyRelatedField(queryset=Game.objects.all(), source='game.name')
    reviews = ReviewSerializer(many=True , required=False)

    class Meta:
        model = Offer
        fields = ('url','id', 'seller', 'game', 'price', 'discount', 'published_date', 'gamekey','description','reviews')

    def create(self, validated_data):
        review_data = validated_data.pop('reviews' , None)
        offer = Offer.objects.create(**validated_data)

        if review_data:
            for review in review_data:
                Review.objects.create(offer=offer, **review)

        return offer
