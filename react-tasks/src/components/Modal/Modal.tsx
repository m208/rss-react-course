import { generateImageUrl, generatePostDate } from 'api/flickr';
import { FlickrSearchItem } from 'api/types';
import React from 'react';
import './Modal.css';

interface ModalProps {
  content: FlickrSearchItem | null;
  onCloseCallback: (status: boolean) => void;
}

export function Modal({ content, onCloseCallback }: ModalProps) {
  return (
    <>
      <div className="modal-background" onClick={() => onCloseCallback(false)}></div>

      <div className="modal-inner">
        <div className="modal-controls">
          <div className="modal-button-wrapper">
            <div className="modal-button" onClick={() => onCloseCallback(false)}>
              <span className="modal-button-text">X</span>
            </div>
          </div>
        </div>

        <div className="modal-content">
          <div className="modal-image">
            <img src={generateImageUrl(content!, 'c')} alt={content?.title} />
          </div>

          <div className="modal-heading">
            <h3 className="modal-title">{content?.title}</h3>
            <div className="modal-info">
              <div className="modal-date">Posted: {generatePostDate(content!)}</div>
              <div className="modal-views">Views: {content?.views}</div>
            </div>
          </div>

          <div className="modal-description">
            {content?.description._content && (
              <>
                <h4>Description:</h4>
                <p>{content?.description._content}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
