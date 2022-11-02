import React from 'react';
import './SearchBar.css';

export default function SearchBar() {
  return (
    <div className="search-bar-wrapper">
      <input type="search" className="search-bar-input" placeholder="Search..." />
    </div>
  );
}
