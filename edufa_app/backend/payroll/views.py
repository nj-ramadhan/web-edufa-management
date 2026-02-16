from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Payroll
from .serializers import PayrollSerializer
from django.db.models import Sum
from billings.models import Billing

# Create your views here.
class PayrollViewSet(viewsets.ModelViewSet):
    queryset = Payroll.objects.all()
    serializer_class = PayrollSerializer

    def perform_create(self, serializer):
        # Simpan data payroll
        instance = serializer.save()
        
        # Logika otomatis: Kirim email jika data dibuat (maksimal tgl 4) [7]
        # Di sini Anda bisa memanggil fungsi send_mail() Django
        instance.is_sent = True
        instance.save()

    def calculate_central_share(branch_id):
    # Rumus: 20% x (Total Pemasukan - Total Pengeluaran Gaji) [8]
        total_inflow = Billing.objects.filter(branch_id=branch_id).aggregate(Sum('jumlah_pembayaran'))['jumlah_pembayaran__sum'] or 0
        total_payroll = Payroll.objects.filter(branch_id=branch_id).aggregate(Sum('total_gaji'))['total_gaji__sum'] or 0
        
        profit_sharing = (total_inflow - total_payroll) * 0.20
        return profit_sharing