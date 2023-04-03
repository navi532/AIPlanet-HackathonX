from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault
from .models import *
from django.utils import timezone


class CreateHackathonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hackathon
        fields = [
            "title",
            "description",
            "background_image",
            "hackathon_image",
            "start_date",
            "end_date",
            "reward_prize",
            "submission_type",
        ]

    def validate(self, attrs):
        # end_date cant be before start_date
        if attrs.get("start_date") > attrs.get("end_date"):
            raise serializers.ValidationError(
                {"end_date": "end_date must be after start_date"}
            )

        return super().validate(attrs)

    def create(self, validated_data):
        return Hackathon.objects.create(**validated_data)


class ViewHackathonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hackathon
        exclude = ("owner", "id")


class EditHackathonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hackathon
        exclude = ("owner", "id")

    def validate(self, attrs):
        hackathon = self.instance

        # end_date cant be before start_date
        if attrs.get("start_date", hackathon.start_date) > attrs.get(
            "end_date", hackathon.end_date
        ):
            raise serializers.ValidationError(
                {"end_date": "end_date must be after start_date!"}
            )

        if attrs.get("start_date") and hackathon.start_date <= timezone.now():
            raise serializers.ValidationError(
                {"message": "start_date cannot be edited after hackathon starts!"}
            )

        if attrs.get("end_date") and hackathon.end_date <= timezone.now():
            raise serializers.ValidationError(
                {"message": "end_date cannot be edited after hackathon ends!"}
            )

        if attrs.get("submission_type") and hackathon.start_date <= timezone.now():
            raise serializers.ValidationError(
                {"message": "submission_type cannot be edited after hackathon starts!"}
            )

        return super().validate(attrs)


class ViewSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        exclude = (
            "hackathon",
            "user",
        )


class CreateSubmissionSerializer(serializers.Serializer):
    hackathon = serializers.CharField(allow_blank=False, max_length=100)

    def validate(self, attrs):
        title = attrs.get("hackathon")
        try:
            hackathon = Hackathon.objects.get(title=title)
            submission = Submission.objects.get(
                hackathon=hackathon, user=self.context["user"]
            )
            raise serializers.ValidationError({"message": "User is already enrolled"})

        except Hackathon.DoesNotExist:
            raise serializers.ValidationError(
                {"hackathon": "No such hackathon exists!"}
            )
        except:
            pass

        if hackathon.start_date <= timezone.now():
            raise serializers.ValidationError(
                {"message": "Cant enroll after hackathon starts!"}
            )

        return super().validate(attrs)

    def create(self, validated_data):
        validated_data["hackathon"] = Hackathon.objects.get(
            title=validated_data["hackathon"]
        )

        return Submission.objects.create(**validated_data)


class EditSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        exclude = ("id", "hackathon", "user", "last_updated")

    def validate(self, attrs):
        submission_type = self.instance.hackathon.submission_type

        if submission_type == "FILE":
            # if not attrs.get("file_submission"):
            #     raise serializers.ValidationError(
            #         {"message": "file_submission is required!"}
            #     )
            if attrs.get("image_submission") or attrs.get("link_submission"):
                raise serializers.ValidationError(
                    {"message": "Only file_submission allowed!"}
                )

        if submission_type == "IMAGE":
            # if not attrs.get("image_submission"):
            #     raise serializers.ValidationError(
            #         {"message": "image_submission is required!"}
            #     )
            if attrs.get("file_submission") or attrs.get("link_submission"):
                raise serializers.ValidationError(
                    {"message": "Only image_submission allowed!"}
                )

        if submission_type == "LINK":
            # if not attrs.get("link_submission"):
            #     raise serializers.ValidationError(
            #         {"message": "link_submission is required!"}
            #     )
            if attrs.get("image_submission") or attrs.get("file_submission"):
                raise serializers.ValidationError(
                    {"message": "Only link_submission allowed!"}
                )

        return super().validate(attrs)
