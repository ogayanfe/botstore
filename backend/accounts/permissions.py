from rest_framework.permissions import IsAuthenticated


class IsAuthenticatedAndAndAdminOrReadOnly(IsAuthenticated):
    """
    Ensure that user is authenticated to access this view and enforces that 
    only admins can perform anything other than a get request
    """

    def has_permission(self, request, view):
        perm = super().has_permission(request, view)
        if request.method in ("GET", "OPTIONS") or not perm:
            return perm
        return perm and request.user.is_admin
