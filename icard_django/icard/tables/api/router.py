from rest_framework.routers import DefaultRouter
from tables.api.views import TableApiViewSet

tables_router = DefaultRouter()

tables_router.register(
    prefix='tables', basename='tables', viewset = TableApiViewSet
)