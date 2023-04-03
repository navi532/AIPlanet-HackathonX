from rest_framework import permissions


class IsAuthenticatedHost(permissions.BasePermission):
    """
    Permission to only allow Authenticated Host users
    """

    message = "Only Host Users are allowed"

    def has_permission(self, request, view):
        # Instance must have an attribute named `owner`.
        return request.user.is_authenticated and request.user.is_staff


class IsAuthenticatedParticipant(permissions.BasePermission):
    """
    Permission to only allow Authenticated Participant users
    """

    message = "Only Participant Users are allowed"

    def has_permission(self, request, view):
        # Instance must have an attribute named `owner`.
        return request.user.is_authenticated and not request.user.is_staff
