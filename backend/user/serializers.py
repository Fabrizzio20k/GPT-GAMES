from rest_framework import serializers
from user.models import User
# Importa el serializer de BillingInfo
from billing_info.serializers import BillingInfoSerializer
from offer.serializers import OfferSerializer


class UserSerializer(serializers.HyperlinkedModelSerializer):
    billing_info = serializers.HyperlinkedRelatedField(
        many=True,
        view_name='billinginfo-detail',
        read_only=True
    )

    offers = serializers.HyperlinkedRelatedField(
        many=True,
        # Asegúrate de que este nombre coincida con el registrado en el router
        view_name='offer-detail',
        read_only=True
    )

    shopping_car = serializers.HyperlinkedRelatedField(
        many=True,
        view_name='shoppingcar-detail',
        read_only=True
    )

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'first_name', 'last_name', 'description',
                  'email', 'phone', 'billing_info', 'offers', 'password', 'shopping_car']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance
