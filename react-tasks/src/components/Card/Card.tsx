import React from 'react';
import './Card.css';

interface CardContentProps {
  imgSrc: string;
  header: string;
  description: string;
  date: string;
}

export default function Card({ imgSrc, header, description, date }: CardContentProps) {
  return (
    <div className="card-wrapper">
      <div className="card-image">
        <img src={imgSrc} alt="Picture" />
      </div>
      <div className="card-heading">
        <h2 className="card-heading-content">{header}</h2>
      </div>
      <div className="card-description">
        <p className="card-description-content">{description}</p>
      </div>
      <div className="card-date">
        <p className="card-date-content">{date}</p>
      </div>
      <div className="card-button-wrapper">
        <div className="card-button">More...</div>
      </div>
    </div>
  );
}
