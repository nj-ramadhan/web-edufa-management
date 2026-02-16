from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Billing
from .serializers import BillingSerializer
from django.db.models import Sum
from payroll.models import Payroll

# Create your views here.
class BillingViewSet(viewsets.ModelViewSet):
    queryset = Billing.objects.all()
    serializer_class = BillingSerializer

    # Filter data berdasarkan cabang agar admin cabang hanya melihat data sendiri [6]
    def get_queryset(self):
        queryset = Billing.objects.all()
        branch_id = self.request.query_params.get('branch', None)
        if branch_id:
            queryset = queryset.filter(branch_id=branch_id)
        return queryset
    
    def calculate_central_share(branch_id):
    # Rumus: 20% x (Total Pemasukan - Total Pengeluaran Gaji) [8]
        total_inflow = Billing.objects.filter(branch_id=branch_id).aggregate(Sum('jumlah_pembayaran'))['jumlah_pembayaran__sum'] or 0
        total_payroll = Payroll.objects.filter(branch_id=branch_id).aggregate(Sum('total_gaji'))['total_gaji__sum'] or 0
        
        profit_sharing = (total_inflow - total_payroll) * 0.20
        return profit_sharing