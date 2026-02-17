import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getBranches } from '../services/branches';

// Styled Components mengikuti tema Barakah Economy & Edufa
const PageContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  color: #0C6E43; // Warna Utama Edufa
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 13px;
`;

const Th = styled.th`
  background-color: #0C6E43;
  color: white;
  padding: 12px;
  border: 1px solid #ddd;
  text-transform: uppercase;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: ${(props) => (props.alignRight ? 'right' : 'left')};
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  background-color: #e6f4ea;
  color: #1e7e34;
`;

const BranchListPage = () => {
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const data = await getBranches();
        setBranches(data);
      } catch (error) {
        console.error("Gagal memuat daftar cabang");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBranches();
  }, []);

  // Fungsi helper untuk menghitung setoran pusat 20% sesuai referensi [2, 5]
  const calculateCentralShare = (income, expense) => {
    return (income - expense) * 0.20;
  };

  if (isLoading) return <p>Memuat data 33 Cabang Edufa...</p>;

  return (
    <PageContainer>
      <Title>Monitoring Keuangan 33 Cabang Edufa</Title>
      
      <div style={{ overflowX: 'auto' }}>
        <Table>
          <thead>
            <tr>
              <Th>No</Th>
              <Th>Nama Cabang</Th>
              <Th>Pengelola / Koordinator</Th>
              <Th>Terapis / Murid</Th>
              <Th>Total Pemasukan</Th>
              <Th>Total Payroll</Th>
              <Th>Setoran Pusat (20%)</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch, index) => (
              <tr key={branch.id}>
                <Td>{index + 1}</Td>
                <Td><strong>{branch.name}</strong></Td>
                <Td>
                  {branch.manager_name} <br />
                  <small style={{ color: '#666' }}>Koord: {branch.coordinator_name}</small>
                </Td>
                <Td>
                  {branch.total_therapists} Terapis / <br />
                  {branch.total_students} Murid
                </Td>
                {/* Data numerik menggunakan toLocaleString untuk format Rupiah */}
                <Td alignRight>Rp {branch.total_income?.toLocaleString()}</Td>
                <Td alignRight>Rp {branch.total_payroll?.toLocaleString()}</Td>
                <Td alignRight style={{ fontWeight: 'bold', color: '#0C6E43' }}>
                  Rp {calculateCentralShare(branch.total_income, branch.total_payroll).toLocaleString()}
                </Td>
                <Td>
                  <StatusBadge>Terverifikasi</StatusBadge>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      
      <p style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        * Perhitungan Setoran Pusat otomatis: 20% dari (Pemasukan - Pengeluaran Gaji) [5].
      </p>
    </PageContainer>
  );
};

export default BranchListPage;