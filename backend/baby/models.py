from django.db import models

class BabyLog(models.Model):
    date = models.DateField()
    note = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.date}: {self.note[:30]}"
# Create your models here.
