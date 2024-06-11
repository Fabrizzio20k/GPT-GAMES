from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


from car_contains_offer.models import CarContainsOffer

from car_contains_offer.serializers import CarContainsOfferSerializer



class CarContainsOfferViewSet(ModelViewSet):
    queryset = CarContainsOffer.objects.all()
    serializer_class = CarContainsOfferSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]