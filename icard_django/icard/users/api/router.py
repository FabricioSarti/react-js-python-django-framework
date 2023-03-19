from django.urls import path
from rest_framework.routers import DefaultRouter
from users.api.views import UserApiViewSet, UserDataView
from rest_framework_simplejwt.views import TokenObtainPairView


router_user = DefaultRouter()

"""
router_user.register(
    prefix='usuarios', basename='usuarios', viewset=UserApiViewSet
)
"""
router_user.register(
    prefix='usuarios', basename='usuarios', viewset=UserApiViewSet
)

#ACA SE PUEDE USAR DE LA MANERA ANTERIOR O BIEN CON URL PATTERNS

urlpatterns = [
    path('auth/login/',TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('auth/me/', UserDataView.as_view())
]
