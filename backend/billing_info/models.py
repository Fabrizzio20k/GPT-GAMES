from django.db import models
from user.models import User
class BillingInfo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE , related_name='billing_info')
    card_number = models.CharField(max_length=20, unique=True)
    expiration_date = models.DateField()
    security_code = models.CharField(max_length=20)
    address = models.CharField(max_length=50)
