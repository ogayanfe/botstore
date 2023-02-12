from django.urls import path
from . import views

urlpatterns = [
    path("", views.StoreListCreateAPIView.as_view()),  # create a list stores
    # update, read and delete stores
    path("<int:store_id>/", views.StoreRetrieveUpdateDestroyAPIView.as_view()),
    # retrieve, destroy and update a particular product
    path("product/<int:prod_id>/info/",
         views.ProductRetrieveUpdateDestroyAPIView.as_view()),
    # list all products by store id
    path("<int:store_id>/products/", views.ProductListAPIView.as_view()),
    # create a product pass
    path(
        "<int:store_id>/cat/<int:cat_id>/product/",
        views.ProductCreateAPIView.as_view()
    ),
]
