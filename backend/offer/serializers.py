from rest_framework import serializers
from .models import Offer
from games.models import Game


class OfferSerializer(serializers.ModelSerializer):
    seller = serializers.ReadOnlyField(source='seller.username')
    game = serializers.PrimaryKeyRelatedField(queryset=Game.objects.all(), source='game.name')
    reviews = serializers.HyperlinkedRelatedField(
        many=True,
        view_name='review-detail',
        read_only=True
    )

    class Meta:
        model = Offer
        fields = ('id', 'seller', 'game', 'price', 'discount', 'published_date', 'reviews')
