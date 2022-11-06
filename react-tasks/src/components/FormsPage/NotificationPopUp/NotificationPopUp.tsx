import React from 'react';
import './NotificationPopUp.css';

interface NotificationPopUpProps {
  message: string;
}

export function NotificationPopUp({ message }: NotificationPopUpProps) {
  return (
    <div className="popup-background">
      <div className="popup-inner">
        <h3 className="popup-text">{message}</h3>
      </div>
    </div>
  );
}
