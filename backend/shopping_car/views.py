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
        serializer.save(owner=self.request.user)