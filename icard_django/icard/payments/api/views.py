from rest_framework.viewsets import ModelViewSet

from payments.models import Payment
from payments.api.serializers import PaymentSerializer

class PaymentApiViewSet(ModelViewSet):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()
    