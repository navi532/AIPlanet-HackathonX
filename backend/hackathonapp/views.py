from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .permissions import IsAuthenticatedHost, IsAuthenticatedParticipant
from .serializers import *


# Create your views here.
class HostCheckView(APIView):
    permission_classes = [IsAuthenticatedHost]

    def get(self, request):
        return Response({"message": "Im Host"}, status=status.HTTP_200_OK)


class ParticipantCheckView(APIView):
    permission_classes = [IsAuthenticatedParticipant]

    def get(self, request):
        return Response({"message": "Im Participant"}, status=status.HTTP_200_OK)


class CreateHackathonAPIView(APIView):
    permission_classes = [IsAuthenticatedHost]
    serializer_class = CreateHackathonSerializer

    def post(self, request):
        serializer = CreateHackathonSerializer(data=request.data)

        return Response({"message": "Im Participant"}, status=status.HTTP_200_OK)
