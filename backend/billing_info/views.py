from rest_framework.viewsets import ModelViewSet
from billing_info.models import BillingInfo
from billing_info.serializers import BillingInfoSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


class BillingInfoViewSet(ModelViewSet):
    queryset = BillingInfo.objects.all()
    serializer_class = BillingInfoSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)





