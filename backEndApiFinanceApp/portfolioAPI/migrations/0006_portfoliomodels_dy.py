# Generated by Django 5.0.6 on 2024-11-22 22:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolioAPI', '0005_portfoliomodels_valuation'),
    ]

    operations = [
        migrations.AddField(
            model_name='portfoliomodels',
            name='dy',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
