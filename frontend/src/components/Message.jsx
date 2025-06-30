import React from 'react';
import './Message.css';

const Message = ({ variant, children }) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'success':
        return 'message-success';
      case 'error':
        return 'message-error';
      default:
        return 'message-info';
    }
  };

  return <div className={`message ${getVariantClass()}`}>{children}</div>;
};

export default Message;
