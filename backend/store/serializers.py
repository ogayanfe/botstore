from rest_framework import serializers
from . import models
from accounts.serializers import UserSerializer


class StoreSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    accessible_users = UserSerializer(many=True, read_only=True)
    created_string = serializers.SerializerMethodField()

    class Meta:
        model = models.Store
        fields = "__all__"

    def create(self, validated_data):
        # Am overiding this method so i can set the owner field

        owner = self.context.get('request').user
        validated_data["owner"] = validated_data.get("owner", owner)
        obj = super().create(validated_data)
        obj.accessible_users.add(owner)
        return obj

    def get_created_string(self, obj):
        return obj.created_string


class CategorySerializer(serializers.ModelSerializer):
    # store = StoreSerializer(read_only=True)
    store = None

    class Meta:
        model = models.Category
        exclude = ("store",)

    def create(self, validated_data):
        store = self.context.get("store")
        validated_data["store"] = validated_data.get("store", store)
        return super().create(validated_data)


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()

    class Meta:
        model = models.Product
        fields = "__all__"

    def create(self, validated_data):
        category = self.context.get("category")
        validated_data["category"] = validated_data.get("category", category)
        return super().create(validated_data)

    def get_category(self, product):
        return product.category.name
