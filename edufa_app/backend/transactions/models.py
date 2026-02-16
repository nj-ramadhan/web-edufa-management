from django.db import models
from billings.models import Billing

# Create your models here.
class Transaction(models.Model):
    TRANSACTION_TYPE = [
        ('inflow', 'Pemasukan (Tagihan Murid)'),
        ('outflow_payroll', 'Pengeluaran (Gaji Terapis)'),
        ('outflow_sharing', 'Setoran Pusat (Profit Sharing)'),
    ]

    billing = models.ForeignKey(Billing, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2) # Jumlah Dibayarkan [3]
    payment_date = models.DateField() # Tanggal Bayar [3]
    bank_origin = models.CharField(max_length=50) # Contoh: BCA, Mandiri, BNI [3, 5]
    bank_destination = models.CharField(max_length=50, default='BCA Pusat') # Terpusat ke 1 Bank [1]
    sender_name = models.CharField(max_length=100) # Nama Orang Tua / Pengirim [3, 4]
    transaction_type = models.CharField(choices=TRANSACTION_TYPE, max_length=20)
    proof_of_payment = models.ImageField(upload_to='receipts/', blank=True) # Bukti bayar (serupa thumbnail campaign) [6]
    
    # Metadata untuk audit
    verified_by_pusat = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type} - {self.sender_name} - {self.amount}"