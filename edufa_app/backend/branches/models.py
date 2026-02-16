from django.db import models

# Create your models here.
class Branch(models.Model):
    name = models.CharField(max_length=100) # Contoh: Cabang Kota [2]
    manager_name = models.CharField(max_length=100) # Nama Pengelola Daerah [2]
    coordinator_name = models.CharField(max_length=100) # Nama Koordinator Daerah [2]
    address = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name