import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const EDUFA_THEME = {
  primaryBlue: '#1E56A0', // Biru dominan "EDfa"
  accentRed: '#EB1D24',   // Jari Merah
  accentYellow: '#F9D923',// Jari Kuning
  accentGreen: '#367E18', // Jari Hijau
  white: '#FFFFFF',
  lightGray: '#F4F7FE'
};

const Sidebar = styled.aside`
  width: 260px;
  height: 100vh;
  background-color: ${EDUFA_THEME.primaryBlue}; /* Sesuai Sidebar di Source [2] */
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
`;

const LogoWrapper = styled.div`
  padding: 30px 20px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  
  img {
    width: 140px; /* Logo Edufa [1] */
  }
`;

const NavGroup = styled.div`
  margin-top: 20px;
  flex-grow: 1;
`;

const NavLinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  padding: 14px 24px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  font-size: 15px;

  /* Icon Styling */
  .material-icons {
    margin-right: 15px;
    font-size: 22px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }

  &.active {
    background-color: rgba(0, 0, 0, 0.15);
    color: ${EDUFA_THEME.accentYellow}; /* Aksen Kuning Logo [1] */
    border-right: 5px solid ${EDUFA_THEME.accentYellow};
    font-weight: 600;
  }
`;

const Navigation = ({ userRole }) => {
  return (
    <Sidebar>
      <LogoWrapper>
        <img src="/images/logo-edufa.png" alt="Edufa" />
      </LogoWrapper>

      <NavGroup>
        {/* Hanya Admin Pusat yang bisa lihat Dashboard & Data Cabang */}
        {userRole === 'CENTRE' && (
          <>
            <NavLinkStyled to="/" className={activeClass('/')}>
              <span className="material-icons" style={{color: EDUFA_THEME.white}}>grid_view</span>
              Dashboard
            </NavLinkStyled>

            <NavLinkStyled to="/payroll" className={activeClass('/payroll')}>
              <span className="material-icons" style={{color: EDUFA_THEME.white}}>payments</span>
              Payroll Terapis
            </NavLinkStyled>

            <NavLinkStyled to="/branches" className={activeClass('/branches')}>
              <span className="material-icons" style={{color: EDUFA_THEME.white}}>corporate_fare</span>
              Data Cabang
            </NavLinkStyled>

            <NavLinkStyled to="/reports" className={activeClass('/reports')}>
              <span className="material-icons">analytics</span>
              Laporan Keuangan
            </NavLinkStyled>
          </>
        )}

        <NavLinkStyled to="/billings" className={activeClass('/billings')}>
          <span className="material-icons" style={{color: EDUFA_THEME.white}}>receipt_long</span>
          Tagihan Murid
        </NavLinkStyled>

        <button onClick={() => { localStorage.clear(); window.location.reload(); }}>
          Logout
        </button>
      </NavGroup>
    </Sidebar>
  );
};

export default Navigation;