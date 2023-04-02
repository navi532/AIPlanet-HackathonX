from rest_framework import serializers
from django.conf import settings
from django.contrib.auth import get_user_model


class RegisterSerializer(serializers.ModelSerializer):
    user_type = serializers.ChoiceField(["HOST", "PARTICIPANT"], allow_blank=False)

    class Meta:
        model = get_user_model()
        fields = ["name", "email", "password", "user_type"]

    def create(self, validated_data):
        user_type = validated_data.pop("user_type")

        return (
            get_user_model().objects.create_staffuser(**validated_data)
            if user_type == "HOST"
            else get_user_model().objects.create_user(**validated_data)
        )
