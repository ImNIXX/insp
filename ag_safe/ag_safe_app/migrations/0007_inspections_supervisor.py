# Generated by Django 3.1 on 2020-08-26 06:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ag_safe_app', '0006_type_type_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='inspections',
            name='supervisor',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
