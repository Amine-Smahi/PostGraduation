# Generated by Django 2.0.5 on 2018-06-03 13:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Administration', '0010_auto_20180603_1307'),
    ]

    operations = [
        migrations.AlterField(
            model_name='passagegrade',
            name='argument',
            field=models.TextField(),
        ),
    ]
