from django.db import models
from branches.models import Branch

# Create your models here.
class Payroll(models.Model):
    therapist_name = models.CharField(max_length=100)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)
    meal_allowance = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    bpjs = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    payroll_date = models.DateField()
    is_sent = models.BooleanField(default=False) # Status notifikasi email