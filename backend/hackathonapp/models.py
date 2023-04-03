from django.db import models
from django.contrib.auth import get_user_model
import uuid
from django.core.validators import MinValueValidator


# Create your models here.
class Hackathon(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title = models.CharField(unique=True, blank=False, max_length=100)
    description = models.TextField(blank=True, max_length=1000)
    background_image = models.ImageField(
        upload_to="images/background", default="default-background.jpg"
    )
    hackathon_image = models.ImageField(
        upload_to="images/hackathon", default="default-hackathon.jpg"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    start_date = models.DateTimeField(blank=False)
    end_date = models.DateTimeField(blank=False)
    reward_prize = models.IntegerField(blank=False, validators=[MinValueValidator(0)])
    submission_type = models.CharField(
        max_length=100,
        blank=False,
        choices=[("FILE", "File"), ("IMAGE", "Image"), ("LINK", "Link")],
    )

    def __str__(self):
        return self.title


class Submission(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    hackathon = models.ForeignKey(Hackathon, on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True, default="Submission New")
    summary = models.TextField(max_length=1000, blank=True)
    file_submission = models.FileField(blank=True, upload_to="submissions/file/")
    image_submission = models.ImageField(blank=True, upload_to="submissions/image/")
    link_submission = models.URLField(blank=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["hackathon", "user"], name="single_submission_allowed"
            )
        ]
