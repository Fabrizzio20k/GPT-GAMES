# Generated by Django 5.0.2 on 2024-06-21 06:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offer', '0002_alter_offer_seller'),
    ]

    operations = [
        migrations.AddField(
            model_name='offer',
            name='description',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='offer',
            name='gamekey',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='offer',
            name='title',
            field=models.CharField(default='', max_length=100),
        ),
    ]
