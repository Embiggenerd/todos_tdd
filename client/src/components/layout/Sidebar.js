import React from 'react';
import SidebarLink from '../buttons/SidebarLink';

const SideBar = ({ auth, handleSidebarClick }) => {
  const renderLinks = () => {
    if (auth) {
      return <SidebarLink role={'logout'} handleClick={handleSidebarClick} />;
    }
    return [
      <SidebarLink key={1} role={'signup'} handleClick={handleSidebarClick} />,
      <SidebarLink key={2} role={'login'} handleClick={handleSidebarClick} />
    ];
  };

  return <div className="sidebar">{renderLinks()}</div>;
};

export default SideBar;
