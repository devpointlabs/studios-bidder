// import React,{useState, useContext,} from 'react';
// import {Icon, Segment, Header, Form, Modal} from 'semantic-ui-react';
// import Colors from "../styles/Colors";
// import styled from "styled-components";
// import SummaryPage from './SummaryPage';


// class SummaryModal extends Component {
//   state = { open: false }

//   // closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
//   //   this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
//   // }

//   close = () => this.setState({ open: false })

//   render() {
//     const { open, closeOnEscape, closeOnDimmerClick } = this.state

//     return (
//       <div>
//         <Modal
//           open={open}
//           closeOnEscape={closeOnEscape}
//           closeOnDimmerClick={closeOnDimmerClick}
//           onClose={this.close}
//         >
//           <SummaryPage eID={estimate_id} name={name} email={email}/>
//           <Modal.Actions>
//             <Button onClick={this.close}>
//               Go back and edit these choices
//             </Button>
//             <Button
//               onClick={this.close}
//               labelPosition='right'
//               icon='checkmark'
//               content='Save and close this estimate'
//             />
//           </Modal.Actions>
//         </Modal>
//       </div>
//     )
//   }
// }

// export default ModalExampleCloseConfig