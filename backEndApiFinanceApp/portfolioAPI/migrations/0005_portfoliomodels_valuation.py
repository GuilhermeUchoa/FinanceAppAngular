# Generated by Django 5.0.6 on 2024-08-31 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolioAPI', '0004_portfoliomodels_precomedio'),
    ]

    operations = [
        migrations.AddField(
            model_name='portfoliomodels',
            name='valuation',
            field=models.FloatField(blank=True, null=True),
        ),
    ]