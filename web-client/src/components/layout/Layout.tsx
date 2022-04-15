import * as React from 'react';
import SideBar from '../sidebar/SideBar';
import './Layout.css';

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <div className="layout">
      <SideBar />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;