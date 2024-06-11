from django.db import models
from user.models import User


class ShoppingCar(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE , related_name='shopping_car')
