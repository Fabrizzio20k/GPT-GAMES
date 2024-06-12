from django.db import models
from user.models import User
from games.models import Game

class Offer(models.Model):
    seller = models.ForeignKey(User, related_name='offers', on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    gamekey = models.CharField(max_length=100)
    published_date = models.DateField(auto_now_add=True)
    price = models.FloatField(default=0)
    discount = models.IntegerField(default=0)