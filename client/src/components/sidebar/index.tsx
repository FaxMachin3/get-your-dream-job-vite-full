import React from 'react';
import Filter from '../filter';

import './styles.scss';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <aside className="sidebar">
      <Filter />
    </aside>
  );
};

export default Sidebar;
