from rest_framework.routers import DefaultRouter
from tables.api.views import TableApiViewSet

router_category = DefaultRouter()

router_category.register(
    prefix='categories', basename='categories', viewset = TableApiViewSet
)