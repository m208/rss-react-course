import React from 'react';
import './Card.css';

interface CardContentProps {
  imgSrc: string | null;
  header: string;
  description: string;
  date: string;
  cardType?: 'default' | 'mini';
  onButtonClick?: () => void;
}

const defaultImage = 'https://placeimg.com/320/320/any';

export default function Card({
  imgSrc,
  header,
  description,
  date,
  cardType = 'default',
  onButtonClick,
}: CardContentProps) {
  return (
    <div className="card-wrapper">
      <div className={cardType === 'mini' ? 'card-mini-image' : 'card-image'}>
        <img src={imgSrc || defaultImage} alt="Picture" />
      </div>
      <div className="card-heading">
        <h2 className="card-heading-content">{header}</h2>
      </div>
      {cardType === 'default' && (
        <>
          <div className="card-description">
            <p className="card-description-content">{description}</p>
          </div>
          <div className="card-date">
            <p className="card-date-content">{date}</p>
          </div>
        </>
      )}
      <div className="card-button-wrapper">
        <div className="card-button" onClick={onButtonClick}>
          More...
        </div>
      </div>
    </div>
  );
}
