from rest_framework import serializers
from .models import BabyLog

class BabyLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BabyLog
        fields = ['id', 'date', 'note', 'created_at']
        