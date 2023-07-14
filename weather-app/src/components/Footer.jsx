import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer_container">
      <p>{currentYear} &nbsp; Fidenz Technologies</p>
    </div>
  );
};

export default Footer;
