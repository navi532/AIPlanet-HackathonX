# Generated by Django 4.1.7 on 2023-04-02 20:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("hackathonapp", "0004_alter_hackathon_title"),
    ]

    operations = [
        migrations.AlterField(
            model_name="hackathon",
            name="owner",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
