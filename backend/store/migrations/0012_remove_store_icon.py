# Generated by Django 4.1.6 on 2023-02-27 15:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0011_remove_product_wait_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='store',
            name='icon',
        ),
    ]