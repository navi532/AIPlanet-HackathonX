from django.urls import path
from .views import *

urlpatterns = [
    path("host/", HostCheckView.as_view(), name="host"),
    path("participant/", ParticipantCheckView.as_view(), name="participant"),
    path("create/", HackathonAPIView.as_view(), name="create-hackathon"),
    path(
        "edit/<str:title>/",
        HackathonAPIView.as_view(),
        name="edit-hackathon",
    ),
    path(
        "delete/<str:title>/",
        HackathonAPIView.as_view(),
        name="delete-hackathon",
    ),
    path(
        "view/",
        HackathonAPIView.as_view(),
        name="view-hackathon",
    ),
    path(
        "submissions/<str:title>/",
        SubmissionAPIView.as_view(),
        name="view-submission",
    ),
    path("enroll/", SubmissionAPIView.as_view(), name="enroll-hackathon"),
    path("submit/<str:title>/", SubmissionAPIView.as_view(), name="edit-submission"),
]
