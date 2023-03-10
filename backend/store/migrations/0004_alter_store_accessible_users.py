# Generated by Django 4.1.6 on 2023-02-11 12:26

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('store', '0003_alter_store_accessible_users'),
    ]

    operations = [
        migrations.AlterField(
            model_name='store',
            name='accessible_users',
            field=models.ManyToManyField(blank=True, related_name='user_stores', to=settings.AUTH_USER_MODEL),
        ),
    ]
