import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Navbar = () => (
  <Menu>
    <Link to="/">
      <Menu.Item>
        Main Display
      </Menu.Item>
    </Link>
    <Link to="/android">
      <Menu.Item>
        Android Display
      </Menu.Item>
    </Link>
    <Link to="/iOS">
      <Menu.Item>
        iOS Display
      </Menu.Item>
    </Link>
    <Link to="/Web">
      <Menu.Item>
        Web Display
      </Menu.Item>
    </Link>
    <Link to="/Login">
      <Menu.Item>
        Login
      </Menu.Item>
    </Link>
    <Link to="/Admin">
      <Menu.Item>
        Admin Display
      </Menu.Item>
    </Link>
  </Menu>
)

export default Navbar;
// link to MainDisplay
// link to android display
// link to iOS display
// link to WebDisplay
// link to Login
// link to AdminDisplay