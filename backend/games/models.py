from django.db import models


class Game(models.Model):
    id = models.IntegerField(primary_key=True, auto_created=True)
    name = models.CharField(max_length=100 , unique=True , default="")

    def __str__(self):
        return str(self.id)