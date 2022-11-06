import React from 'react';
import './Loader.css';

export function Loader() {
  return (
    <div className="loader-background">
      <div className="loader-inner">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
