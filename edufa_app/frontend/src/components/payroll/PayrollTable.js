import React from 'react';

const PayrollTable = ({ payrolls }) => {
  return (
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
  );
};

export default PayrollTable;