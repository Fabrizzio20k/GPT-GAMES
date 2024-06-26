from rest_framework import serializers
from user.models import User
from billing_info.serializers import BillingInfoSerializer  # Importa el serializer de BillingInfo
from offer.serializers import OfferSerializer
from shopping_car.serializers import ShoppingCarSerializer

class UserSerializer(serializers.ModelSerializer):
    billing_info = BillingInfoSerializer(read_only=True , many=True)

    offers = OfferSerializer(read_only=True, many=True)

    shopping_car = ShoppingCarSerializer(read_only=True, many=True)
    class Meta:
        model = User
        fields = ['id', 'username','profile_picture' , 'first_name', 'last_name', 'description', 'email','phone', 'billing_info', 'offers'
            ,'shopping_car']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class RegisterSerializer(serializers.ModelSerializer):
    billing_info = BillingInfoSerializer(read_only=True, many=True)

    offers = OfferSerializer(read_only=True, many=True)

    shopping_car = ShoppingCarSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'profile_picture', 'first_name', 'last_name', 'description', 'email', 'password',
                  'phone', 'billing_info', 'offers', 'shopping_car']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
       model = User
       fields = ['profile_picture']

    def update(self, instance, validated_data):
        instance.profile_picture = validated_data.get('profile_picture', instance.profile_picture)
        instance.save()
        return instance

class SearchSerializer(serializers.ModelSerializer):

    offers = OfferSerializer(read_only=True, many=True)

    shopping_car = ShoppingCarSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'profile_picture', 'first_name', 'last_name', 'description', 'email',
                  'phone', 'offers', 'shopping_car']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user