from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()


class Store(models.Model):
    name = models.CharField(max_length=128)
    logo = models.ImageField(upload_to="images/store", null=True)
    icon = models.ImageField(upload_to="images/store/icons", null=True)
    moto = models.CharField(max_length=128)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="created_stores")
    accessible_users = models.ManyToManyField(
        User, related_name="accessible_stores", blank=True)
    is_public = models.BooleanField(null=False, default=True)

    def user_can_edit(self, user):
        return user.id == self.owner.id

    def can_create_products(self, user):
        if user is None or not user.is_authenticated:
            return False
        return self.accessible_users.filter(id=user.id) or self.owner == user


class Category(models.Model):
    name = models.CharField(max_length=128, unique=True, blank=False)
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to="images/categories", blank=False)


class Product(models.Model):
    name = models.CharField(max_length=128)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.IntegerField(null=False)
    thumbnail = models.ImageField(upload_to="images/products", blank=False)
    stock_amount = models.IntegerField()
    weight = models.IntegerField(null=True)
    wait_time = models.DurationField(null=True, default=None)
    is_public = models.BooleanField(default=True)

    @classmethod
    def user_accessible_products(cls, user):
        """
        Returns only products a user can access 
        """

        qs = cls.objects
        output = qs.filter(category__store__accessible_users__id=user.id) | qs.filter(
            category__store__owner__id=user.id)
        return output

    def can_edit(self, user):
        if user is None or not user.is_authenticated:
            return False
        store = self.category.store
        return store.owner == user or store.accessible_users.filter(user__id=user.id)
