import React from 'react';

const Footer = () => {
  return (
    <nav className="footer">
      <div className="footer-brand">
        <a href="/">Footer</a>
      </div>
      <ul className="footer-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Footer;