from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAuthenticatedHost, IsAuthenticatedParticipant
from .serializers import *
from django.http import Http404
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser


# Create your views here.
class HostCheckView(APIView):
    permission_classes = [IsAuthenticatedHost]

    def get(self, request):
        return Response({"message": "Im Host"}, status=status.HTTP_200_OK)


class ParticipantCheckView(APIView):
    permission_classes = [IsAuthenticatedParticipant]

    def get(self, request):
        return Response({"message": "Im Participant"}, status=status.HTTP_200_OK)


class HackathonAPIView(APIView):
    permission_classes = [IsAuthenticatedHost]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_permissions(self):
        if self.request.method == "GET":
            # Allow both users to access
            return [IsAuthenticated()]

        # Otherwise, use the default permission classes
        return super().get_permissions()

    def get_serializer_class(self):
        if self.request.method == "GET":
            return ViewHackathonSerializer
        elif self.request.method == "POST":
            return CreateHackathonSerializer
        elif self.request.method in ("PUT", "PATCH"):
            return EditHackathonSerializer

    def get_object(self, owner, title):
        try:
            return Hackathon.objects.get(owner=owner, title=title)
        except Hackathon.DoesNotExist:
            raise Http404

    def get(self, request):
        """
        Shows a list of Hackathons
        if me:true given as query, only shows specific to owner
        If title given as query, then shows a specific hackathon with given title
        if sortby:oldest ,oldest one come first,
        if sortby:newest, then new comes first
        """
        params = {}
        if request.query_params.get("title"):
            params["title"] = request.query_params.get("title")

        if request.query_params.get("me", "false").lower() == "true":
            if request.user.is_staff:
                params["owner"] = request.user
            else:
                params["submission__user"] = request.user

        queryset = Hackathon.objects.filter(**params).order_by("?")  # Random each time
        if request.query_params.get("sortby") == "oldest":
            queryset = queryset.order_by("start_date")
        elif request.query_params.get("sortby") == "newest":
            queryset = queryset.order_by("-start_date")
        serializer = self.get_serializer_class()(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Create a new hackathon with unique title
        """
        serializer = self.get_serializer_class()(data=request.data)

        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, title):
        """
        Edit a exisiting hackathon
        If updating all fields at once
        """
        try:
            hackathon = self.get_object(owner=request.user, title=title)
        except:
            return Response(
                {"message": "Resource Not Found"}, status=status.HTTP_400_BAD_REQUEST
            )
        serializer = self.get_serializer_class()(instance=hackathon, data=request.data)

        if serializer.is_valid():
            hackathon = serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, title):
        """
        Edit a exisiting hackathon
        If updating only some fields
        """
        try:
            hackathon = self.get_object(owner=request.user, title=title)
        except:
            return Response(
                {"message": "Resource Not Found"}, status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer_class()(
            instance=hackathon, data=request.data, partial=True
        )

        if serializer.is_valid():
            hackathon = serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, title):
        """
        Delete a exisiting hackathon
        """
        try:
            hackathon = self.get_object(owner=request.user, title=title)
        except:
            return Response(
                {"message": "Resource Not Found"}, status=status.HTTP_400_BAD_REQUEST
            )

        hackathon.delete()
        return Response(
            {"message": "Hackathon Deleted!"}, status=status.HTTP_204_NO_CONTENT
        )


class SubmissionAPIView(APIView):
    permission_classes = [IsAuthenticatedParticipant]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_permissions(self):
        if self.request.method == "GET":
            # Allow both users to access
            return [IsAuthenticated()]

        # Otherwise, use the default permission classes
        return super().get_permissions()

    def get_serializer_class(self):
        if self.request.method == "GET":
            return ViewSubmissionSerializer
        elif self.request.method == "POST":
            return CreateSubmissionSerializer
        elif self.request.method in ("PUT", "PATCH"):
            return EditSubmissionSerializer

    def get_object(self, title, user):
        try:
            hackathon = Hackathon.objects.get(title=title)
            return Submission.objects.get(hackathon=hackathon, user=user)
        except Submission.DoesNotExist:
            raise Http404

    def get_data_by_id(self, id):
        submission = Submission.objects.get(id=id)
        data = {
            "hackathon": submission.hackathon.title,
            "name": submission.name,
            "user": submission.user.email,
            "summary": submission.summary,
            "submitted_at": submission.updated_at,
        }
        data[
            f"{submission.hackathon.submission_type.lower()}_submission"
        ] = submission.__dict__.get(
            f"{submission.hackathon.submission_type.lower()}_submission"
        )

        return data

    def get(self, request, title):
        """
        Shows a list of Submissions of a given hackathon title
        if sortby:oldest ,oldest one come first,
        if sortby:newest, then new comes first
        """
        params = {}
        try:
            params["hackathon"] = Hackathon.objects.get(title=title)
        except:
            return Response(
                {"message": "Resource Not Found"}, status=status.HTTP_400_BAD_REQUEST
            )

        if request.user.is_staff:
            params["hackathon__owner"] = request.user
        else:
            params["user"] = request.user

        queryset = (
            Submission.objects.filter(**params)
            .values("id", "name", "updated_at")
            .order_by("?")
        )  # Random each time
        if request.query_params.get("sortby") == "oldest":
            queryset = queryset.order_by("updated_at")
        elif request.query_params.get("sortby") == "newest":
            queryset = queryset.order_by("-updated_at")
        serializer = self.get_serializer_class()(queryset, many=True)

        responsedata = [self.get_data_by_id(data.get("id")) for data in serializer.data]

        return Response(responsedata, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Enroll a user into hackathon

        body:
        {"hackathon":<title>}
        """

        serializer = self.get_serializer_class()(
            data=request.data, context={"user": request.user}
        )
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(
                {"message": "Successfully Enrolled"}, status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, title):
        try:
            submission = self.get_object(title=title, user=request.user)
        except:
            return Response(
                {"message": "Resource Not Found"}, status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer_class()(instance=submission, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
