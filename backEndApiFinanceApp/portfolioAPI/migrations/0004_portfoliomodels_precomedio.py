# Generated by Django 5.0.6 on 2024-07-28 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolioAPI', '0003_portfoliomodels_variacaoanual'),
    ]

    operations = [
        migrations.AddField(
            model_name='portfoliomodels',
            name='precoMedio',
            field=models.FloatField(blank=True, null=True),
        ),
    ]