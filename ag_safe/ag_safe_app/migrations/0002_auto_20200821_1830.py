# Generated by Django 3.1 on 2020-08-21 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ag_safe_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inspections',
            name='draft_directory',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='inspections',
            name='draft_form_name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='inspections',
            name='draft_name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='inspections',
            name='inspection_approve',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='inspections',
            name='status',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='inspections',
            name='user_id',
            field=models.IntegerField(blank=True),
        ),
    ]
