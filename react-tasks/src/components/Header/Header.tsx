import React from 'react';
import './Header.css';

interface HeaderProps {
  currentPage: string;
}

export default function Header({ currentPage }: HeaderProps) {
  return (
    <header className="header-wrapper">
      <p className="header-current-page">{currentPage}</p>
    </header>
  );
}
