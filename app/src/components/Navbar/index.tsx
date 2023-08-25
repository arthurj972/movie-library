import React, { type ReactElement } from 'react';
import { Nav, NavLink, NavMenu } from './NavbarElements';

const Navbar = (): ReactElement => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/my'>My library</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
