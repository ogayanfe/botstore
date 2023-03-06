from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView
from accounts.permissions import IsAuthenticatedAndAndAdminOrReadOnly
from . import serializers
from django.contrib.auth import get_user_model
from . import models
from django.http import Http404
from django.shortcuts import get_object_or_404


User = get_user_model()


class DashboardStoreListCreateAPIView(ListCreateAPIView):
    """
    Users must be authenticated to view this view
    Returns all stores that current user created or can access
    """

    serializer_class = serializers.StoreSerializer

    def get_queryset(self):
        user: User = self.request.user
        if user.is_admin:
            return user.created_stores
        return user.creator.created_stores


class DashboardStoreRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.StoreSerializer
    lookup_url_kwarg = "store_id"

    def get_queryset(self):
        user: User = self.request.user
        if user.is_admin:
            return user.created_stores.all()
        return user.creator.created_stores.all()


class DashboardProductListAPIView(ListAPIView):
    serializer_class = serializers.ProductSerializer
    lookup_url_kwarg = "store_id"

    def get_queryset(self):
        user = self.request.user
        store_id = self.kwargs.get(self.lookup_url_kwarg)
        store = get_object_or_404(models.Store, id=store_id)
        products = models.Product.objects.filter(category__store__id=store_id)

        if not store.accessible_users.contains(user):
            raise Http404()

        return products


class DashboardProductCreateAPIView(CreateAPIView):
    serializer_class = serializers.ProductSerializer
    lookup_url_kwarg = "store_id"

    def get_serializer_context(self):
        # Need to overide this method to pass in category id to serializer
        # so i can get the models to save them to model
        context = super().get_serializer_context()

        category_obj = get_object_or_404(
            models.Category, pk=self.kwargs.get("cat_id"))

        context["category"] = category_obj

        return context


class DashboardProductRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.ProductSerializer
    lookup_url_kwarg = "prod_id"

    def get_queryset(self):
        user = self.request.user
        if user.is_admin:
            return models.Product.objects.filter(category__store__owner=user)
        return models.Product.objects.filter(category__store__owner=user.creator)


class DashboardCategoriesListCreateAPIView(ListCreateAPIView):
    serializer_class = serializers.CategorySerializer

    def get_queryset(self):
        store_id = self.kwargs.get("store_id")
        user = self.request.user
        store = get_object_or_404(models.Store, pk=store_id)

        if not store.accessible_users.contains(user):
            raise Http404

        return store.category_set

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx["store"] = get_object_or_404(
            models.Store, pk=self.kwargs.get("store_id"))
        return ctx


class DashboardCategoryRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.CategorySerializer
    lookup_url_kwarg = "cat_id"

    def get_queryset(self):
        store_id = self.kwargs.get("store_id")
        user = self.request.user
        store = get_object_or_404(models.Store, pk=store_id)

        if store.owner != user and store.owner != user.creator:
            raise Http404
        return store.category_set.all()
