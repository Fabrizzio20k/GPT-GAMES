from rest_framework.exceptions import ValidationError
from django.db import IntegrityError
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


from shopping_car.models import ShoppingCar


from shopping_car.serializers import ShoppingCarSerializer


class ShoppingCarViewSet(ModelViewSet):
    queryset = ShoppingCar.objects.all()
    serializer_class = ShoppingCarSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def perform_create(self, serializer):

        if ShoppingCar.objects.filter(owner=self.request.user).exists():
            response = {
                "error": "El usuario ya tiene un carrito de compras."
            }
            raise ValidationError(response)

        try:
            serializer.save(owner=self.request.user)
        except IntegrityError:
            response = {
                "error": "El usuario ya tiene un carrito de compras."
            }
            raise ValidationError(response)
