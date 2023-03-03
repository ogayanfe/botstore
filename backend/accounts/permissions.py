from rest_framework.permissions import IsAuthenticated


class IsAuthenticatedAndAndAdminOrReadOnly(IsAuthenticated):

    def has_permission(self, request, view):
        perm = super().has_permission(request, view)
        if request.method in ("GET", "OPTIONS"):
            return perm
        return perm and request.user.is_admin
