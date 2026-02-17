// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import LoginPage from './pages/LoginPage';

// Edufa Finance Pages
import FinanceDashboard from './pages/FinanceDashboard';
import BillingPage from './pages/BillingPage';
import PayrollPage from './pages/PayrollPage';
import BranchListPage from './pages/BranchListPage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-200 flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative">
          <Routes>
            {/* Dashboard Utama: Ringkasan Profit Sharing 80/20 & Total Pemasukan */}
            <Route path="/" element={<FinanceDashboard />} />

            {/* Manajemen Tagihan: Menampilkan Data Murid & Master Pembayaran */}
            <Route path="/billings" element={<BillingPage />} />

            {/* Manajemen Payroll: Laporan Gaji Terapis per Cabang */}
            <Route path="/payroll" element={<PayrollPage />} />

            {/* Daftar Cabang: Monitoring 33 Cabang Edufa */}
            <Route path="/branches" element={<BranchListPage />} />

            {/* Autentikasi: Login untuk Admin Pusat & Admin Cabang */}
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};


export default App;