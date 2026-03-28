from rest_framework import generics
from .models import BabyLog
from .serializers import BabyLogSerializer

class BabyLogListCreateView(generics.ListCreateAPIView):
    queryset = BabyLog.objects.all().order_by('-date')
    serializer_class = BabyLogSerializer