from rest_framework import serializers
from .models import Review
from offer.models import Offer


class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    commenter = serializers.ReadOnlyField(source='commenter.username')
    offer = serializers.PrimaryKeyRelatedField(queryset=Offer.objects.all())

    class Meta:
        model = Review
        fields = ['url', 'id', 'commenter', 'offer' , 'text']
