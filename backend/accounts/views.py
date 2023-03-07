from rest_framework.generics import RetrieveUpdateAPIView, ListCreateAPIView
from .serializers import UserDetailSerializer, UserCreateSerializer
from django.contrib.auth import get_user_model
from .permissions import IsAuthenticatedAndAndAdminOrReadOnly
from django.db.models import Q

User = get_user_model()


class UserProfileDataAPIView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer


class UserCreateListStaffAPIView(ListCreateAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = [IsAuthenticatedAndAndAdminOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(Q(creator=user) | (Q(creator=user.creator) & Q(id=user.id)))

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        if self.request.method == "GET":
            return ctx
        ctx["creator"] = self.request.user
        return ctx
