from django.db import models
from shopping_car.models import ShoppingCar
from offer.models import Offer


class CarContainsOffer(models.Model):
    shopping_car = models.ForeignKey(ShoppingCar, related_name='offers_contained', on_delete=models.CASCADE)
