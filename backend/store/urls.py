from django.urls import path
from . import views

urlpatterns = [
    # create a list stores
    path("", views.DashboardStoreListCreateAPIView.as_view()),
    # update, read and delete stores
    path("<int:store_id>/", views.DashboardStoreRetrieveUpdateDestroyAPIView.as_view()),
    # retrieve, destroy and update a particular product
    path("product/<int:prod_id>/info/",
         views.DashboardProductRetrieveUpdateDestroyAPIView.as_view()),
    # list all products by store id
    path("<int:store_id>/products/", views.DashboardProductListAPIView.as_view()),
    path(
        "<int:store_id>/cat/<int:cat_id>/createproduct/",
        views.DashboardProductCreateAPIView.as_view()
    ),
    path("<int:store_id>/categories/",
         views.DashboardCategoriesListCreateAPIView.as_view()),
    path("<int:store_id>/cat/<int:cat_id>/",
         views.DashboardCategoryRetrieveUpdateDestroyAPIView.as_view())
]
