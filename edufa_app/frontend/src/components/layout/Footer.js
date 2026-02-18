// components/layout/Footer.js
import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
  return (
    <Footer className="footer">
      <div className="container">
        <div className="flex items-center">
          <img src="/images/logo.png" alt="EDUFA PAY" className="logo" />
          <span className="title">EDUFA PAY</span>
        </div>
      </div>
    </Footer>
  );
};

export default Footer;