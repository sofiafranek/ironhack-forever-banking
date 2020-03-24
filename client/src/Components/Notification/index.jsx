import React, { Fragment } from 'react';
import Toast from 'react-bootstrap/Toast';
import './style.scss';
import { updateNotification } from './../../Services/notification';
import Card from 'react-bootstrap/Card';

const Notification = props => {
  const { userID, userIDFrom, messageFrom, messageTo, createdAt, _id } = props;
  let message = '',
    type = '';

  if (userID === userIDFrom) {
    message = messageFrom;
    type = 'Sent';
  } else {
    message = messageTo;
    type = 'Received';
  }

  const currentDate = new Date();
  const createdDate = new Date(createdAt);

  const diffTime = Math.abs(createdDate - currentDate);
  const diffSeconds = Math.ceil(diffTime / 1000);
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let messageTime = '';

  if (diffSeconds < 60) {
    messageTime = `${diffSeconds} seconds ago`;
  } else if (diffMinutes < 60) {
    messageTime = `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    messageTime = `${diffHours} hours ago`;
  } else {
    messageTime = `${diffDays} days ago`;
  }

  async function handleClick(event) {
    event.preventDefault();
    try {
      const notification = await updateNotification(_id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Toast className="hvr-grow notification" onClick={event => handleClick(event)}>
      <Toast.Header>
        <strong className="mr-auto pl-0">{type}</strong>
        <small>{messageTime}</small>
      </Toast.Header>
      <Toast.Body className="notification-text">{message}</Toast.Body>
    </Toast>
  );
};

export default Notification;
