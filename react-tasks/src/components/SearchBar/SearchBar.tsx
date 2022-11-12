import React, { useEffect, useRef, useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  searchCallBack: (text: string) => void;
}

export function SearchBar({ searchCallBack }: SearchBarProps) {
  const searchInput = useRef<HTMLInputElement>(null);
  const [localValue, setLocalValue] = useState('');

  const saveLastValue = () => {
    localStorage.setItem('searchBarSavedValue', searchInput.current!.value);
  };

  useEffect(() => {
    setLocalValue(localStorage.getItem('searchBarSavedValue') || '');
    window.addEventListener('beforeunload', saveLastValue);

    return () => {
      window.removeEventListener('beforeunload', saveLastValue);
    };
  }, []);

  const handleKeyUp = async (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (searchInput.current) {
        searchCallBack(searchInput.current.value);
      }
    }
  };

  return (
    <div className="search-bar-wrapper">
      <input
        ref={searchInput}
        type="search"
        className="search-bar-input"
        placeholder="Search..."
        defaultValue={localValue}
        onKeyUp={(e: React.KeyboardEvent) => handleKeyUp(e)}
        onChange={saveLastValue}
      />
    </div>
  );
}
