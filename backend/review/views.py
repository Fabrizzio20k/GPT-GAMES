#All you need
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

# Models needed key and the other one
from review.models import Review
from offer.models import Offer

# Serializers
from review.serializers import ReviewSerializer


class ReviewViewSet(ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def perform_create(self, serializer):
        offer_id = self.request.data.get('offer')
        offer = get_object_or_404(Offer, id=offer_id)
        serializer.save(commenter=self.request.user, offer=offer)
