#All you need
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

#Models needed
from transaction.models import Transaction
from user.models import User
from offer.models import Offer

#serializer
from transaction.serializers import TransactionSerializer

class TransactionViewSet(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    def perform_create(self, serializer):

        seller_id = self.request.data['seller']
        offer_id = self.request.data['offer']
        print(seller_id, offer_id)
        seller = get_object_or_404(User, id=seller_id)
        offer = get_object_or_404(Offer, id=offer_id)
        serializer.save(seller=seller, offer=offer , buyer=self.request.user)

