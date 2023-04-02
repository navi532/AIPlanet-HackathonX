from rest_framework import permissions


# class IsOwnerOrReadOnly(permissions.BasePermission):
#     """
#     Object-level permission to only allow owners of an object to edit it.
#     Assumes the model instance has an `owner` attribute.
#     """

#     def has_object_permission(self, request, view, obj):
#         # Read permissions are allowed to any request,
#         # so we'll always allow GET, HEAD or OPTIONS requests.
#         if request.method in permissions.SAFE_METHODS:
#             return True

#         # Instance must have an attribute named `owner`.
#         return obj.owner == request.user


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
