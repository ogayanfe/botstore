from django.db import models
from django.db.models import Q
from django.contrib.auth import get_user_model
from django.contrib.humanize.templatetags.humanize import naturaltime

# Create your models here.

User = get_user_model()


class Store(models.Model):
    name = models.CharField(max_length=128)
    logo = models.ImageField(upload_to="images/store", null=True)
    moto = models.CharField(max_length=128)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="created_stores")
    is_public = models.BooleanField(null=False, default=True)
    created = models.DateTimeField(auto_now_add=True)

    @property
    def accessible_users(self):
        """
        Returns a queryset that contains the users that access store from the dashboard
        """
        return User.objects.filter(Q(id=self.owner.id) | Q(creator=self.owner)).distinct()

    @property
    def created_string(self):
        return naturaltime(self.created)

    def user_can_edit(self, user):
        return user.id == self.owner.id

    def __str__(self):
        return f"store: {self.name}"


class Category(models.Model):
    name = models.CharField(max_length=128, unique=True, blank=False)
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to="images/categories", blank=False)

    def __str__(self):
        return f"category: {self.name} | store: {self.store.name}"


class Product(models.Model):
    name = models.CharField(max_length=128)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.IntegerField(null=False)
    thumbnail = models.ImageField(upload_to="images/products", blank=False)
    stock_amount = models.IntegerField()
    weight = models.IntegerField(null=True)
    is_public = models.BooleanField(default=True)

    def __str__(self):
        return f"product: {self.name} | category: {self.category.name} | store: {self.category.store.name}"
    
    def can_edit(self, user):
        if user is None or not user.is_authenticated:
            return False
        store = self.category.store
        return store.accessible_users.filter(user__id=user.id).exists()
