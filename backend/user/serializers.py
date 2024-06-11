from rest_framework import serializers
from user.models import User
from billing_info.serializers import BillingInfoSerializer  # Importa el serializer de BillingInfo
from offer.serializers import OfferSerializer

class UserSerializer(serializers.HyperlinkedModelSerializer):
    billing_info = serializers.HyperlinkedRelatedField(
        many=True,
        view_name='billinginfo-detail',
        read_only=True
    )

    offers = serializers.HyperlinkedRelatedField(
        many=True,
        view_name='offer-detail',  # Asegúrate de que este nombre coincida con el registrado en el router
        read_only=True
    )

    shopping_car = serializers.HyperlinkedRelatedField(
        many=True,
        view_name='shoppingcar-detail',
        read_only=True
    )
    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'first_name', 'last_name', 'description', 'email', 'phone', 'billing_info', 'offers' , 'password'
            ,'shopping_car']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user