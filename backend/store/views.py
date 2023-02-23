from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from . import serializers
from django.contrib.auth import get_user_model
from . import models
from django.http import Http404
from django.shortcuts import get_object_or_404, get_list_or_404


User = get_user_model()


class StoreListCreateAPIView(ListCreateAPIView):
    """
    Users must be authenticated to view this view
    Returns all stores that current user created or can access
    """

    serializer_class = serializers.StoreSerializer

    def get_queryset(self):
        user: User = self.request.user
        return user.created_stores.all() | models.Store.objects.filter(accessible_users__id=user.id)


class StoreRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.StoreSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_url_kwarg = "store_id"
    order_by = "-id"

    def get_queryset(self):
        user: User = self.request.user
        if not user.is_authenticated:
            return models.Store.objects.filter(is_public=True)

        if self.request.method != "GET":
            # Only allow owner to modify store details
            return user.created_stores.all()

        # allow user to view only stores he created or public groups
        return user.created_stores.all() | models.Store.objects.filter(is_public=True)


class ProductListAPIView(ListAPIView):
    serializer_class = serializers.ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_url_kwarg = "store_id"

    def get_queryset(self):
        user = self.request.user
        store_id = self.kwargs.get(self.lookup_url_kwarg)
        store = get_object_or_404(models.Store, id=store_id)
        products = models.Product.objects.filter(category__store__id=store_id)

        if not store.can_create_products(user):
            return products.filter(is_public=True)

        return products


class ProductCreateAPIView(CreateAPIView):
    serializer_class = serializers.ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_url_kwarg = "store_id"

    def get_queryset(self):
        user = self.request.user

        category = get_object_or_404(
            models.Category, pk=self.kwargs.get(self.lookup_field))

        if category.store != self.kwargs.get("store_id"):
            raise Http404()

        owned_products = models.Product.objects.filter(
            category_store__owner=user)
        contrib_products = models.Product.objects.filter(
            category__store__accessible__users__id=user.id)

        return owned_products | contrib_products

    def get_serializer_context(self):
        # Need to overide this method to pass in category id to serializer
        # so i can get the models to save them to model
        context = super().get_serializer_context()

        category_obj = get_object_or_404(
            models.Category, pk=self.kwargs.get("cat_id"))

        context["category"] = category_obj

        return context


class ProductRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_url_kwarg = "prod_id"

    def get_queryset(self):
        user = self.request.user

        product = get_object_or_404(
            models.Product, pk=self.kwargs.get('prod_id')
        )

        if not product.can_edit(user):
            return models.Product.objects.filter(is_public=True)

        return models.Product.objects.filter(is_public=True) | models.Product.user_accessible_products(user)


class CategoriesListCreateAPIView(ListCreateAPIView):
    serializer_class = serializers.CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        store_id = self.kwargs.get("store_id")
        user = self.request.user
        store = get_object_or_404(models.Store, pk=store_id)
        if self.request.method != "GET":
            if not store.accessible_users.contains(user) or store.owner == user:
                raise Http404

        return models.Category.objects.filter(store=store)

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx["store"] = get_object_or_404(
            models.Store, pk=self.kwargs.get("store_id"))
        return ctx


class CategoryRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_url_kwarg = "cat_id"

    def get_queryset(self):
        store_id = self.kwargs.get("store_id")
        cat_id = self.kwargs.get("cat_id")
        user = self.request.user
        category = get_object_or_404(models.Category, pk=cat_id)
        store = get_object_or_404(models.Store, pk=store_id)
        if not category.store == store:
            raise Http404
        if self.request.method == "GET":
            print(store.category_set.all())
            return store.category_set.all()
        if store.accessible_users.contains(user) or store.owner == user:
            return store.category_set.all()
        raise Http404
