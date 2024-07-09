from django.db import models
from user.models import User
from offer.models import Offer

class ShoppingCar(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name='shopping_car')
    offers = models.ManyToManyField(Offer, related_name='offer_in_car')