import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/layout/Header';
import NavigationButton from '../components/layout/Navigation';
import { getPayrolls } from '../services/finance';

const BranchListPage = () => {
  const [payrolls, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const data = await getPayrolls();
        setBranches(data);
      } catch (error) {
        console.error("Gagal memuat daftar payroll");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayrolls();
  }, []);

  // Fungsi helper untuk menghitung setoran pusat 20% sesuai referensi [2, 5]
  const calculateCentralShare = (income, expense) => {
    return (income - expense) * 0.20;
  };

  if (isLoading) return <p>Memuat data 33 Cabang Edufa...</p>;

  return (
    <PageContainer>
      <NavigationButton />
      <Title>Monitoring Keuangan 33 Cabang Edufa</Title>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Laporan Payroll Terapis</h3>
        <table className="w-full text-sm border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">NAMA TERAPIS</th>
              <th className="border p-2">GAJI POKOK</th>
              <th className="border p-2">TUNJ. MAKAN</th>
              <th className="border p-2">BPJS</th>
              <th className="border p-2">TUNJ. KINERJA</th>
              <th className="border p-2">TOTAL GAJI</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((p, idx) => (
              <tr key={idx}>
                <td className="border p-2">{p.nama_terapis}</td>
                <td className="border p-2">Rp {p.gaji_pokok.toLocaleString()}</td>
                <td className="border p-2">Rp {p.tunjangan_makan.toLocaleString()}</td>
                <td className="border p-2">Rp {p.bpjs_kesehatan.toLocaleString()}</td>
                <td className="border p-2">Rp {p.tunjangan_kinerja.toLocaleString()}</td>
                <td className="border p-2 font-bold">Rp {p.total_gaji.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-red-500 mt-2">* Notifikasi email dikirim otomatis maksimal tanggal 4 [9].</p>
      </div>
      
      <p style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        * Perhitungan Setoran Pusat otomatis: 20% dari (Pemasukan - Pengeluaran Gaji) [5].
      </p>
    </PageContainer>
  );
};

export default PayrollPage;