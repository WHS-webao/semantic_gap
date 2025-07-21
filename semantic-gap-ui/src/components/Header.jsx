// src/components/Header.jsx
import React from 'react';
import logo from '../assets/weave-logo.png';
import './Header.css';

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-brand">
        <img src={logo} alt="WEAVE" className="brand-logo" />
        <span className="brand-text">WEAVE</span>
      </div>
      <h1 className="site-title">Semantic Gap Categories</h1>
    </header>
  );
}
