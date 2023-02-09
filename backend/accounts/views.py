from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView
from django.conf import settings
from .serializers import UserSerializer
from django.contrib.auth import get_user_model

# Create your views here.

User = get_user_model()


class UserProfileDataAPIView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
