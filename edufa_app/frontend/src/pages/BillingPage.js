import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../styles/Body.css';
import { getBillings } from '../services/finance'; // Menggunakan service yang dibuat sebelumnya

// Tema Warna Logo Edufa
const THEME = {
  blue: '#1E56A0',
  green: '#367E18',
  lightGray: '#F4F7FE'
};

const PageWrapper = styled.div`
  padding: 20px;
  background-color: ${THEME.lightGray};
  min-height: 100vh;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TableContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  th {
    background-color: ${THEME.blue};
    color: white;
    padding: 12px;
    border: 1px solid #ddd;
    text-align: center;
    white-space: nowrap;
  }

  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
  }

  tr:nth-child(even) { background-color: #f9f9f9; }
`;

const FilterSection = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    &.active { background: ${THEME.blue}; color: white; }
    &.inactive { background: #e0e0e0; color: #666; }
  }
`;

const BillingPage = () => {
  const [billings, setBillings] = useState([]);
  const [serviceFilter, setServiceFilter] = useState('terapi'); // Default ke Terapi

  useEffect(() => {
    // Simulasi pengambilan data berdasarkan filter layanan [4]
    const fetchData = async () => {
      const data = await getBillings();
      setBillings(data.filter(b => b.service_type === serviceFilter));
    };
    fetchData();
  }, [serviceFilter]);

  return (
    <PageWrapper>
      <HeaderContainer>
        <h2 style={{ color: THEME.blue }}>Manajemen Tagihan Murid</h2>
        <p style={{ fontSize: '12px' }}>Periode Invoice: Tanggal 29/30 - Tgl 5 Bulan Depan</p>
      </HeaderContainer>

      <FilterSection>
        <button 
          className={serviceFilter === 'terapi' ? 'active' : 'inactive'} 
          onClick={() => setServiceFilter('terapi')}
        >
          DP & Terapi (80/20)
        </button>
        <button 
          className={serviceFilter === 'pas' ? 'active' : 'inactive'} 
          onClick={() => setServiceFilter('pas')}
        >
          Layanan PAS (20/20/60)
        </button>
      </FilterSection>

      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>NO</th>
              <th>NO. INDUK</th>
              <th>NAMA LENGKAP</th>
              <th>JUMLAH SESI</th>
              <th>JUMLAH PEMBAYARAN</th>
              <th>TANGGAL</th>
              <th>KODE</th>
              <th>JUMLAH DIBAYARKAN</th>
              <th>NAMA ORANG TUA</th>
              <th>TUJUAN BANK / CASH</th>
            </tr>
          </thead>
          <tbody>
            {billings.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.no_induk}</td>
                <td style={{ textAlign: 'left' }}>{item.nama_lengkap}</td>
                <td>{item.jumlah_sesi.toFixed(1)}</td> {/* Menampilkan 1.0 atau 0.5 [5] */}
                <td>Rp {item.jumlah_pembayaran.toLocaleString()}</td>
                <td>{item.tanggal}</td>
                <td style={{ fontWeight: 'bold', color: THEME.green }}>{item.kode_pembayaran}</td>
                <td>Rp {item.jumlah_dibayarkan.toLocaleString()}</td>
                <td>{item.nama_orang_tua}</td>
                <td>{item.tujuan_bank}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
        {billings.length === 0 && (
          <p style={{ textAlign: 'center', padding: '20px' }}>Belum ada tagihan yang dibuat untuk layanan ini.</p>
        )}
      </TableContainer>
    </PageWrapper>
  );
};

export default BillingPage;