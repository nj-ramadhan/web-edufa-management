import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px; /* Mengikuti gaya spreadsheet */
`;

const Th = styled.th`
  background-color: #0C6E43; /* Warna Primary Edufa */
  color: white;
  padding: 10px;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: center;
`;

const BillingTable = ({ data }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <Table>
        <thead>
          <tr>
            <Th>NO. INDUK</Th>
            <Th>NAMA LENGKAP</Th>
            <Th>SESI</Th>
            <Th>JUMLAH PEMBAYARAN</Th>
            <Th>TANGGAL</Th>
            <Th>KODE</Th>
            <Th>NAMA ORANG TUA</Th>
            <Th>TUJUAN BANK</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <Td>{item.no_induk}</Td>
              <Td style={{ textAlign: 'left' }}>{item.nama_lengkap}</Td>
              <Td>{item.jumlah_sesi}</Td> {/* Input 0.5 atau 1.0 [6] */}
              <Td>Rp {item.jumlah_pembayaran.toLocaleString()}</Td>
              <Td>{item.tanggal}</Td>
              <Td>{item.kode_pembayaran}</Td> {/* C1-C11 atau H1-H4 [7, 8] */}
              <Td>{item.nama_orang_tua}</Td>
              <Td>{item.tujuan_bank}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BillingTable;
