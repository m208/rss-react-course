import React from 'react';
import './Loader.css';

export class Loader extends React.Component {
  render() {
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
}
