import { getRandomSearchPhoto, photosSearch } from 'api/flickr';
import { FlickrSearchItem } from 'api/types';
import React, { useEffect, useRef, useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  searchCallBack: (searchResult: Array<FlickrSearchItem>) => void;
  ajaxAnimationCallback: (status: boolean) => void;
}

export function SearchBar({ searchCallBack, ajaxAnimationCallback }: SearchBarProps) {
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
      ajaxAnimationCallback(true);

      if (searchInput.current) {
        // const search = await getRandomSearchPhoto(searchInput.current.value);
        const search = await photosSearch(searchInput.current.value);
        searchCallBack(search.photos.photo);
      }

      ajaxAnimationCallback(false);
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
