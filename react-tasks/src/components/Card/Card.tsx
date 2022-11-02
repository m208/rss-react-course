import React from 'react';
import './Card.css';

export default function Card() {
  return (
    <div className="card-wrapper">
      <div className="card-image">
        <img src="https://placeimg.com/320/320/any" alt="Picture" />
      </div>
      <div className="card-heading">
        <h2 className="card-heading-content">Header</h2>
      </div>
      <div className="card-description">
        <p className="card-description-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga cumque ipsum similique est
          officia sunt error illum ipsa amet voluptatibus!
        </p>
      </div>
      <div className="card-date">
        <p className="card-date-content">01.01.2022</p>
      </div>
      <div className="card-button-wrapper">
        <div className="card-button">More...</div>
      </div>
    </div>
  );
}
