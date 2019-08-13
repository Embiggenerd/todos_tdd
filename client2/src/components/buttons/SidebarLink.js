import React from 'react';

const capFirstLetter = str => str.charAt(0).toUpperCase() + str.substr(1);

const SidebarLink = ({ role, handleClick }) => {
  return (
    <a
      data-test-id={`${role}-button`}
      className="sidebar--link"
      href="#"
      onClick={e => handleClick(e, role)}
    >
      {capFirstLetter(role)}
    </a>
  );
};

export default SidebarLink;
