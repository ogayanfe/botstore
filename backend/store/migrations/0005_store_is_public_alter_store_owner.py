# Generated by Django 4.1.6 on 2023-02-11 13:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('store', '0004_alter_store_accessible_users'),
    ]

    operations = [
        migrations.AddField(
            model_name='store',
            name='is_public',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='store',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_stores', to=settings.AUTH_USER_MODEL),
        ),
    ]