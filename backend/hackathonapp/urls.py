from django.urls import path
from .views import *

urlpatterns = [
    path("host/", HostCheckView.as_view(), name="host"),
    path("participant/", ParticipantCheckView.as_view(), name="participant"),
]
