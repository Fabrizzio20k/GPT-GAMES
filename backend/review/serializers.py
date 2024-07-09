from rest_framework import serializers
from .models import Review
from offer.models import Offer

class ReviewSerializer(serializers.ModelSerializer):
    commenter = serializers.ReadOnlyField(source='commenter.username')
    profile_picture = serializers.ImageField(source='commenter.profile_picture' , read_only=True)
    offer = serializers.PrimaryKeyRelatedField(queryset=Offer.objects.all()  , required=False)

    class Meta:
        model = Review
        fields = ['url','id', 'profile_picture','commenter', 'offer', 'text']
        read_only_fields = ['offer', 'commenter', 'profile_picture']
