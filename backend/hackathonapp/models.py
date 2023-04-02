from django.db import models
from django.contrib.auth import get_user_model
import uuid
from django.core.validators import MinValueValidator


# Create your models here.
class Hackathon(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    title = models.CharField(blank=False, max_length=100)
    description = models.TextField(blank=True, max_length=1000)
    background_image = models.ImageField(
        upload_to="images/background", default="default-background.jpg"
    )
    hackathon_image = models.ImageField(
        upload_to="images/hackathon", default="default-hackathon.jpg"
    )
    start_date = models.DateTimeField(blank=False)
    end_date = models.DateTimeField(blank=False)
    reward_prize = models.IntegerField(blank=False, validators=[MinValueValidator(0)])
    submission_type = models.CharField(
        max_length=100,
        blank=False,
        choices=[("FILE", "File"), ("IMAGE", "Image"), ("LINK", "Link")],
    )


class Submission(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    hackathon = models.OneToOneField(Hackathon, on_delete=models.CASCADE)
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True)
    summary = models.TextField(max_length=1000, blank=True)
    file_submission = models.FileField(blank=True, upload_to="submissions/file/")
    image_submission = models.ImageField(blank=True, upload_to="submissions/image/")
    link_submission = models.URLField(blank=True)
