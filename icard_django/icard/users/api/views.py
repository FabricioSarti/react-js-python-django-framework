from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny

from rest_framework.response import Response

from django.contrib.auth.hashers import make_password

from users.api.serializers import UserSerializer
from users.models import User

#ESTE ModelViewSet ES PROPIO DE DJANGO Y LO QUE HACE ES HACERME UN CRUD
class UserApiViewSet(ModelViewSet):
    permission_class = [IsAdminUser] #AQUI NOS DICE QUE SOLO EL ADMINISTRADOR PUEDE ACCEDER
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        request.data['password'] = make_password(request.data['password'])
        return super().create(request, *args, **kwargs)

    def partial_update(self, request, *args,**kwargs):
        password = request.data['password'] 
        if password:
            request.data['password'] = make_password(password)
        else:
            request.data['password'] = request.user.password
        return super().update(request, *args, **kwargs)

#IGUAL ES DE DJANGO PERO LO QUE HACE EL APIView ES SOLO CREARME UN ENDPOINT
#NOTAR QUE USERSERIALIZER ES PARA QUE ME RETORNE LOS MODELOS COMO CRUD PERO ACA SOLO LE DIGO QUE ES UN GET Y NO EL CRUD COMPLETO
class UserDataView(APIView):
    permission_class = [IsAuthenticated] #QUIENES PUEDEN ACCEDER AL API

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)