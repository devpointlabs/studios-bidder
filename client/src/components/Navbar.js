import React, {useContext, } from "react";
import { Link,} from "react-router-dom";
import { Menu, Image, Header } from "semantic-ui-react";
import styled from 'styled-components';
import {AuthContext, } from '../providers/AuthProvider';

const Navbar = ({history}) => {
  const {handleLogout, authenticated} = useContext(AuthContext)

  return(
  <Menu borderless pointing secondary >
    <Menu.Menu position="left">
      <Link to="/">
        <Menu.Item>
          <Image
            src={require('../images/dpl-logo.png')}
            size="tiny"
          />
        </Menu.Item>
      </Link> 
      <Link to="/">
        <Menu.Item>
          <br/>
          <Header align="center" as={NavHeader}>DevPoint Labs</Header>
        </Menu.Item>
      </Link>
    </Menu.Menu>
    {/* /////////////////////////////////////////////// */}
    {/* NAVBAR CODE BELOW IS FOR EASE OF DEVELOPMENT  */}
    <Menu.Menu position="right">
    <Link to="/History">
      <Menu.Item>
        <br/>
        { authenticated &&
        <Header align="center" as={NavRight}> History</Header>
        }
      </Menu.Item>
    </Link>
    <Link to="/Admin">
      <Menu.Item>
        <br/>
        { authenticated &&
        <Header align="center" as={NavRight}> Admin</Header>
        }
      </Menu.Item>
    </Link>
      { authenticated ? 
      <Link to="/">
        <Menu.Item>
          <br/>
          <Header align='center' as={NavRight} onClick={() => handleLogout(history)}>
            Logout
          </Header> 
        </Menu.Item>
      </Link>
      : 
      <Link to="/Login">
        <Menu.Item>
          <br/>
          <Header align="center" as={NavRight}> Login </Header>
      </Menu.Item>
      </Link>
      }
    </Menu.Menu>
  </Menu>
    // {/* REMOVE ABOVE BEFORE PRODUCTION AND USE CODE BELOW */}

  //   <Menu.Menu position="right">
  //   <Link to="/History">
  //     <Menu.Item>
  //       <br/>
  //       { authenticated &&
  //       <Header align="center" as={NavRight}> History</Header>
  //       }
  //     </Menu.Item>
  //   </Link>
  //   <Link to="/Admin">
  //     <Menu.Item>
  //       <br/>
  //       { authenticated &&
  //       <Header align="center" as={NavRight}> Admin</Header>
  //       }
  //     </Menu.Item>
  //   </Link>
  //     { authenticated ? 
  //     <Link to="/">
  //       <Menu.Item>
  //         <br/>
  //         <Header align='center' as={NavRight} onClick={() => handleLogout(history)}>
  //           Logout
  //         </Header> 
  //       </Menu.Item>
  //     </Link>
  //     : 
  //     <Link to="/Login">
  //       <Menu.Item>
  //         <br/>
  //         <Header align="center" as={NavRight}> Login </Header>
  //     </Menu.Item>
  //     </Link>
  //     }
  //   </Menu.Menu>
  // </Menu>
  );
};


const NavHeader = styled.h1`
    color: rgb(129, 104, 177) !important;
    font-family: 'Poppins', sans-serif;
    font-size: '25px' !important;
`;

const NavRight = styled.h1`
    color: rgb(129, 104, 177) !important;
    font-family: 'Poppins', sans-serif;
    font-size: '10px' !important;
`;

export default Navbar;
// link to MainDisplay
// link to android display
// link to iOS display
// link to WebDisplay
// link to Login
// link to AdminDisplay