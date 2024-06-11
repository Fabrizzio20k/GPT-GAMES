from rest_framework import serializers
from .models import Transaction
from user.models import User
from offer.models import Offer



class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    buyer = serializers.ReadOnlyField(source='buyer.username')
    seller = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    offer = serializers.PrimaryKeyRelatedField(queryset=Offer.objects.all())

    class Meta:
        model = Transaction
        fields = ['url' , 'id' , 'buyer' , 'seller' , 'offer' , 'purchase_date' , 'gamekey' ]
