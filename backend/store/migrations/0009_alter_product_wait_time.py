# Generated by Django 4.1.6 on 2023-02-11 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0008_alter_product_wait_time_alter_product_weight'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='wait_time',
            field=models.DurationField(default=None, null=True),
        ),
    ]