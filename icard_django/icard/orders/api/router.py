from rest_framework.routers import DefaultRouter
from orders.api.views import OrderApiViewSet

orders_router = DefaultRouter()

orders_router.register(
    prefix='orders', basename='orders', viewset = OrderApiViewSet
)