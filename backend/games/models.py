from django.db import models


class Game(models.Model):
    id = models.IntegerField(primary_key=True, auto_created=True)

    def __str__(self):
        return str(self.id)