# Generated by Django 4.2.6 on 2023-10-25 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Posts', '0006_alter_comment_post_alter_comment_user_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='img',
        ),
        migrations.AlterField(
            model_name='post',
            name='video',
            field=models.CharField(default=1, max_length=500),
            preserve_default=False,
        ),
    ]
