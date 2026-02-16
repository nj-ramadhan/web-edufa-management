from rest_framework import serializers
from .models import Billing

class BillingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Billing
        fields = [
            'id', 'no_induk', 'nama_lengkap', 'jumlah_sesi', 
            'jumlah_pembayaran', 'tanggal', 'kode_pembayaran', 
            'nama_orang_tua', 'tujuan_bank', 'branch'
        ]