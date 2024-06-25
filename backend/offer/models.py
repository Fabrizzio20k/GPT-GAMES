from django.db import models
from user.models import User
from games.models import Game

class Offer(models.Model):
    seller = models.ForeignKey(User, related_name='offers', on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    description = models.TextField(default="No description yet")
    gamekey = models.CharField(max_length=50 , null=True)
    published_date = models.DateField(auto_now_add=True)
    price = models.FloatField(default=0)
    discount = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.seller} - {self.game} - {self.price} - {self.discount}'