from rest_framework import serializers
from .models import Payroll

class PayrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payroll
        fields = [
            'id', 'nama_terapis', 'branch', 'gaji_pokok', 
            'tunjangan_makan', 'bpjs_kesehatan', 'tunjangan_kinerja', 
            'tunjangan_sesi_5', 'total_gaji', 'is_sent'
        ]