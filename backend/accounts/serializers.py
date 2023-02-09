from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model


User = get_user_model()


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name")
