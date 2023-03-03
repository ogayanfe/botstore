from rest_framework.generics import RetrieveUpdateAPIView, ListCreateAPIView
from .serializers import UserSerializer, UserDetailSerializer, UserCreateSerializer
from django.contrib.auth import get_user_model
from .permissions import IsAuthenticatedAndAndAdminOrReadOnly

User = get_user_model()


class UserProfileDataAPIView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer


class UserCreateListStaffAPIView(ListCreateAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = [IsAuthenticatedAndAndAdminOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_admin:
            return User.objects.filter(creator=user)
        return User.objects.filter(creator=user.creator)

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        if self.request.method == "GET":
            return ctx
        ctx["creator"] = self.request.user
        return ctx
