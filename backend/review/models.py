from django.db import models
from user.models import User
from offer.models import Offer

class Review(models.Model):
    commenter = models.ForeignKey(User, related_name='reviews', on_delete=models.CASCADE)
    offer = models.ForeignKey(Offer, related_name='reviews', on_delete=models.CASCADE)
    text = models.TextField()
