import React, {useContext, } from "react";
import { Link,} from "react-router-dom";
<<<<<<< HEAD
import { Menu, Image, Header } from "semantic-ui-react";
import styled, { keyframes } from 'styled-components';
=======
import { Menu, Image, Header, Responsive } from "semantic-ui-react";
import styled from 'styled-components';
>>>>>>> 0a0220c9b1ecc860c05e4b6937ba16fc49686b64
import {AuthContext, } from '../providers/AuthProvider';

const Navbar = ({history}) => {
  const {handleLogout, authenticated} = useContext(AuthContext)

  return(
  <Menu borderless pointing secondary >
    <Menu.Menu position="left">
      <Link to="/">
        <Menu.Item>
          <Jiggle>
            <Image
              src={require('../images/dpl-logo.png')}
              size="tiny"
              // as={tooltip}
            />
          </Jiggle>
        </Menu.Item>
      </Link> 
      <Link to="/">
        <Menu.Item>
          <br/>
          <Responsive align="center" as={NavHeader} {...Responsive.onlyComputer}>DevPoint Labs</Responsive>
        </Menu.Item>
      </Link>
    </Menu.Menu>
    {/* /////////////////////////////////////////////// */}
    {/* NAVBAR CODE BELOW IS FOR EASE OF DEVELOPMENT  */}
    <Menu.Menu position="right">
    <Link to="/History">
      <Menu.Item>
        <br/>
        <Header align="center" as={NavRight}> History</Header>
      </Menu.Item>
    </Link>
    <Link to="/Admin">
      <Menu.Item>
        <br/>
        <Header align="center" as={NavRight}> Admin</Header>
      </Menu.Item>
    </Link>
      <Link to="/Login">
      <Menu.Item>
        <br/>
        <Header align="center" as={NavRight}> Login </Header>
      </Menu.Item>
    </Link>
    </Menu.Menu>
  </Menu>
  );
};
//REMOVE ABOVE BEFORE PRODUCTION AND USE CODE BELOW

// <Menu.Menu position="right">
// <Link to="/History">
//   <Menu.Item>
//     <br/>
//     { authenticated &&
//     <Header align="center" as={NavRight}> History</Header>
//     }
//   </Menu.Item>
// </Link>
// <Link to="/Admin">
//   <Menu.Item>
//     <br/>
//     { authenticated &&
//     <Header align="center" as={NavRight}> Admin</Header>
//     }
//   </Menu.Item>
// </Link>
//   { authenticated ? 
//   <Link to="/">
//     <Menu.Item>
//       <br/>
//       <Header align='center' as={NavRight} onClick={() => handleLogout(history)}>
//         Logout
//       </Header> 
//     </Menu.Item>
//   </Link>
//   : 
//   <Link to="/Login">
//     <Menu.Item>
//       <br/>
//       <Header align="center" as={NavRight}> Login </Header>
//   </Menu.Item>
//   </Link>
//   }
//   </Menu.Menu>
// </Menu>


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

const jiggy = keyframes`
  10%, 90% {
    transform: translate3d(-.5px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(1px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-2px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(2px, 0, 0);
  }
`

const Jiggle = styled.div`
  &:hover {
  animation: ${jiggy} 0.82s cubic-bezier(.18,.035,.095,.475) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
  }
`

export default Navbar;
// link to MainDisplay
// link to android display
// link to iOS display
// link to WebDisplay
// link to Login
// link to AdminDisplay