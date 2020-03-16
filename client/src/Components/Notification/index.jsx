import React from 'react';
import './style.scss';

import Toast from 'react-bootstrap/Toast';

const Notification = () => {
  return (
    <Toast>
      <Toast.Header>
        <strong className="mr-auto pl-0">Title</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
    </Toast>
  );
};

export default Notification;
