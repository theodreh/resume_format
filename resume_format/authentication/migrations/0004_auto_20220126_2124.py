# Generated by Django 3.1.5 on 2022-01-26 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_auto_20220126_2122'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermodel',
            name='contact_no',
            field=models.IntegerField(default=None, null=True),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='date_of_birth',
            field=models.DateField(default=None, null=True),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='user_age',
            field=models.IntegerField(default=None, null=True),
        ),
    ]
