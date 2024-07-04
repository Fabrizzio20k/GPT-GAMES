from rest_framework import serializers

from review.models import Review
from .models import Offer
from games.models import Game
from review.serializers import ReviewSerializer


class OfferSerializer(serializers.ModelSerializer):
    seller = serializers.ReadOnlyField(source='seller.username')
    queryset = Game.objects.all()
    game = serializers.PrimaryKeyRelatedField(
        queryset=queryset, source='game.name')
    game_id = serializers.PrimaryKeyRelatedField(
        queryset=queryset, source='game.id'
    )
    reviews = ReviewSerializer(many=True, required=False)

    class Meta:
        model = Offer
        fields = ('url', 'id', 'seller', 'game', 'game_id', 'price', 'discount',
                  'published_date', 'gamekey', 'description', 'reviews', 'link')

    def create(self, validated_data):
        review_data = validated_data.pop('reviews', None)
        offer = Offer.objects.create(**validated_data)

        if review_data:
            for review in review_data:
                Review.objects.create(offer=offer, **review)

        return offer
