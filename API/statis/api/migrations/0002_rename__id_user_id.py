# Generated by Django 4.1.2 on 2022-11-08 07:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="user",
            old_name="_id",
            new_name="id",
        ),
    ]
