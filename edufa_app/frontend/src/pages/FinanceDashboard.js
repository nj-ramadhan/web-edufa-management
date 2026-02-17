import React, { useState, useEffect } from 'react';
import BillingTable from '../components/billing/BillingTable';
import { getBillings, getPayrolls } from '../services/finance';

const FinanceDashboard = () => {
  const [billings, setBillings] = useState([]);
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    // Simulasi pengambilan data untuk kantor pusat
    const fetchData = async () => {
      const bData = await getBillings();
      const pData = await getPayrolls();
      setBillings(bData);
      setPayrolls(pData);
    };
    fetchData();
  }, []);

  // Logika Perhitungan Profit Sharing (20% ke Pusat) [11]
  const totalPemasukan = billings.reduce((acc, curr) => acc + curr.jumlah_pembayaran, 0);
  const totalGaji = payrolls.reduce((acc, curr) => acc + curr.total_gaji, 0);
  const setoranPusat = (totalPemasukan - totalGaji) * 0.20;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">Keuangan Terpusat Edufa</h1>
      
      {/* Ringkasan Profit Sharing */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-green-100 rounded">
          <p className="text-sm">Total Pemasukan</p>
          <p className="text-xl font-bold">Rp {totalPemasukan.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-red-100 rounded">
          <p className="text-sm">Total Pengeluaran Gaji</p>
          <p className="text-xl font-bold">Rp {totalGaji.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-blue-100 rounded border-2 border-blue-500">
          <p className="text-sm font-bold text-blue-800">Setoran ke Pusat (20%)</p>
          <p className="text-xl font-bold text-blue-800">Rp {setoranPusat.toLocaleString()}</p>
        </div>
      </div>

      <BillingTable data={billings} />
    </div>
  );
};

export default FinanceDashboard;