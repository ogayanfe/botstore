from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.contrib.auth import get_user_model


User = get_user_model()


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ("id", "username", "email", "is_admin")

    @classmethod
    def serialize_model(cls, instance):
        return cls(instance)


class UserDetailSerializer(UserSerializer):
    creator = UserSerializer()

    class Meta:
        model = User
        fields = ("id", "username", "email", "is_admin", "creator")

    def get_creator(self, obj):
        if obj.creator is None:
            return None


class UserCreateSerializer(UserSerializer):

    class Meta:
        model = User
        fields = ("id", "username", "email", "is_admin", "password")
        extra_kwargs = {
            "password": {
                "write_only": True,
            }
        }

    def create(self, validated_data):
        creator = self.context.get("creator")
        validated_data["creator"] = validated_data.get("creator", creator)
        return super().create(validated_data)
