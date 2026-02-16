from django.db import models

# Create your models here.
class Payroll(models.Model):
    therapist_name = models.CharField(max_length=100)
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)
    meal_allowance = models.DecimalField(max_digits=10, decimal_places=2)
    bpjs = models.DecimalField(max_digits=10, decimal_places=2)
    is_sent = models.BooleanField(default=False) # Status notifikasi email