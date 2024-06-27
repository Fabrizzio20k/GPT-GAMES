from rest_framework import serializers
from user.models import User
from billing_info.serializers import BillingInfoSerializer
from offer.serializers import OfferSerializer
from shopping_car.serializers import ShoppingCarSerializer
from transaction.serializers import TransactionSerializer
from transaction.models import Transaction

class UserSerializer(serializers.ModelSerializer):
    billing_info = BillingInfoSerializer(read_only=True, many=True)
    offers = OfferSerializer(read_only=True, many=True)
    shopping_car = ShoppingCarSerializer(read_only=True, many=True)
    transactions = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'username', 'profile_picture', 'first_name', 'last_name',
            'description', 'email', 'phone', 'billing_info', 'offers', 
            'shopping_car', 'transactions'
        ]

    def get_transactions(self, obj):
        transactions = Transaction.objects.filter(buyer=obj)
        return TransactionSerializer(transactions, many=True).data

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class RegisterSerializer(serializers.ModelSerializer):
    billing_info = BillingInfoSerializer(read_only=True, many=True)
    offers = OfferSerializer(read_only=True, many=True)
    shopping_car = ShoppingCarSerializer(read_only=True, many=True)
    transactions = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'username', 'profile_picture', 'first_name', 'last_name',
            'description', 'email', 'password', 'phone', 'billing_info', 
            'offers', 'shopping_car', 'transactions'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def get_transactions(self, obj):
        transactions = Transaction.objects.filter(buyer=obj)
        return TransactionSerializer(transactions, many=True).data

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

class ProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['profile_picture']

    def update(self, instance, validated_data):
        instance.profile_picture = validated_data.get(
            'profile_picture', instance.profile_picture)
        instance.save()
        return instance

class SearchSerializer(serializers.ModelSerializer):
    offers = OfferSerializer(read_only=True, many=True)
    shopping_car = ShoppingCarSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'profile_picture', 'first_name', 'last_name', 
            'description', 'email', 'phone', 'offers', 'shopping_car'
        ]

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user
