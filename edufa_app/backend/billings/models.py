from django.db import models
from branches.models import Branch

# Create your models here.
class Billing(models.Model):
    SERVICE_CHOICES = [
        ('dp', 'DP'),
        ('terapi', 'Terapi'),
        ('pas', 'PAS'),
    ]
    student_name = models.CharField(max_length=100)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    service_type = models.CharField(choices=SERVICE_CHOICES, max_length=10)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    billing_date = models.DateField() # Dibuat otomatis tgl 29/30
    status = models.BooleanField(default=False) # Paid/Unpaid