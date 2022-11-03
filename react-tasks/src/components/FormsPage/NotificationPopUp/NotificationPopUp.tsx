import React from 'react';
import './NotificationPopUp.css';

interface NotificationPopUpProps {
  message: string;
}

interface NotificationPopUpState {
  active: boolean;
}

export class NotificationPopUp extends React.Component<
  NotificationPopUpProps,
  NotificationPopUpState
> {
  constructor(props: NotificationPopUpProps) {
    super(props);
  }

  render() {
    return (
      <div className="popup-background">
        <div className="popup-inner">
          <h3 className="popup-text">{this.props.message}</h3>
        </div>
      </div>
    );
  }
}
