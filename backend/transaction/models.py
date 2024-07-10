from django.db import models
from user.models import User
from offer.models import Offer


class Transaction(models.Model):
    buyer = models.ForeignKey(User, related_name='buyer',  on_delete=models.CASCADE)
    seller = models.ForeignKey(User, related_name='seller', on_delete=models.CASCADE)
    offer = models.ForeignKey(Offer, related_name='offer', on_delete=models.CASCADE)
    gamekey = models.CharField(max_length=100)
    purchase_date = models.DateField(auto_now_add=True)
