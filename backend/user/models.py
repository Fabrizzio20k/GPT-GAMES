from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    fullname = models.CharField(max_length=175)
    description = models.TextField()
    phone = models.CharField(max_length=18)

    # secondary keys:
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150 , unique=True)
