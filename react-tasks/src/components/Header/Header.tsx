import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  currentPage: string;
}

export default function Header({ currentPage }: HeaderProps) {
  return (
    <header className="header-wrapper">
      <p className="header-current-page">{currentPage}</p>
      <div className="header-links"></div>
      <Link to="/">MAIN</Link>
      <Link to="/forms">FORMS</Link>
      <Link to="/about">ABOUT</Link>
    </header>
  );
}
