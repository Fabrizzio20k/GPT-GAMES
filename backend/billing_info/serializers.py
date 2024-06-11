from rest_framework import serializers
from .models import BillingInfo

class BillingInfoSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = BillingInfo
        fields = '__all__'