from rest_framework import serializers
from .models import ShoppingCar


class ShoppingCarSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    offers_contained = serializers.HyperlinkedRelatedField(
        many=True,
        view_name='carcontainsoffer-detail',
        read_only=True,
    )

    class Meta:
        model = ShoppingCar
        fields = ('url', 'id', 'owner', 'offers_contained')