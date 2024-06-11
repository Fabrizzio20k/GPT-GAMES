from django.db import models
from shopping_car.models import ShoppingCar
from offer.models import Offer


class CarContainsOffer(models.Model):
    shopping_car = models.ForeignKey(ShoppingCar, related_name='offers_contained', on_delete=models.CASCADE)
    offer = models.ForeignKey(Offer, related_name='my_product', on_delete=models.CASCADE)
