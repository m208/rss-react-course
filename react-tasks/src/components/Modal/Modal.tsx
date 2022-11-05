import { generateImageUrl, generatePostDate } from 'api/flickr';
import { FlickrSearchItem } from 'api/types';
import React from 'react';
import './Modal.css';

interface ModalProps {
  content: FlickrSearchItem | null;
  onCloseCallback: (status: boolean) => void;
}

interface ModalState {
  active: boolean;
}

export class Modal extends React.Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="modal-background" onClick={() => this.props.onCloseCallback(false)}></div>

        <div className="modal-inner">
          <div className="modal-controls">
            <div className="modal-button-wrapper">
              <div className="modal-button" onClick={() => this.props.onCloseCallback(false)}>
                <span className="modal-button-text">X</span>
              </div>
            </div>
          </div>

          <div className="modal-content">
            <div className="modal-image">
              <img
                src={generateImageUrl(this.props.content!, 'c')}
                alt={this.props.content?.title}
              />
            </div>

            <div className="modal-heading">
              <h3 className="modal-title">{this.props.content?.title}</h3>
              <div className="modal-info">
                <div className="modal-date">Posted: {generatePostDate(this.props.content!)}</div>
                <div className="modal-views">Views: {this.props.content?.views}</div>
              </div>
            </div>

            <div className="modal-description">
              {this.props.content?.description._content && (
                <>
                  <h4>Description:</h4>
                  <p>{this.props.content?.description._content}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
