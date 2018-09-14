import React from 'react';

const Modal = ({ name, message, onClose }) => {
  return (
    <div
      className={message ? 'click_catcher--open' : 'click_catcher'}
      onClick={onClose}
    >
      <div className="modal" data-test-id="modal">
        <h3>{name}</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
