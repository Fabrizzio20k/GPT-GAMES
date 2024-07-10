from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
import os
# Create your models here.

def get_upload_path(instance, filename):
    return os.path.join('images', 'profile_pictures', str(instance.id), filename)




class User(AbstractUser):
    username = models.CharField(max_length=255 , unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    description = models.TextField()
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    profile_picture = models.ImageField(upload_to=get_upload_path , blank=True , null=True)

    # Add these fields with unique related_name attributes
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',  # Change this to something unique
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions_set',  # Change this to something unique
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )

