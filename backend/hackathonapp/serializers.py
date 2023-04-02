from rest_framework import serializers
from .models import *


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

    def create(self, validated_data):
        user = self.context["request"].user
