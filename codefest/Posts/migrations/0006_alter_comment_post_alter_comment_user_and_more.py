# Generated by Django 4.2.6 on 2023-10-25 15:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Posts', '0005_like_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='post',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='comment',
            name='user',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='like',
            name='post',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='like',
            name='user',
            field=models.IntegerField(unique=True),
        ),
    ]
