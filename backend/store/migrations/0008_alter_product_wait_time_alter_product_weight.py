# Generated by Django 4.1.6 on 2023-02-11 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0007_product_is_public'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='wait_time',
            field=models.DurationField(null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='weight',
            field=models.IntegerField(null=True),
        ),
    ]