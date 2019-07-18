import React, { Component, useState, useEffect, useContext } from 'react';
// import _ from 'lodash'
import axios from 'axios'
import { Table, Loader, Dropdown, Segment, Search, Label, Modal, Icon, Header, Menu, Button, Dimmer, Pagination } from 'semantic-ui-react'
import Navbar from './Navbar'
import SummaryPage from './summary/SummaryPage';
import styled from "styled-components";
import { FeatureContext} from '../providers/FeatureProvider';
import DataTable from 'react-data-table-component';

// const HistoryPaginated = () => {
//   const [data, setData] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const { fullEstimates, handleEstimates } = useContext(FeatureContext);

//   useEffect(() => {
//     // axios.get(`/api/estimates`)
//     //   .then(res => {setEstimates(res.data);
//     //     console.log(estimates)})
//     handleEstimates()
//   }, [])

//   const handleCloseModal = () => {
//     setModalOpen(false)
//   }
//   const handleOpenModal = () => {
//     setModalOpen(true)
//   }

//   const tableColumns = [
//     { title: 'Estimate No.', selector: 'estimate_id', sortable: true, },
//     { title: 'Customer Name', selector: 'name', sortable: true,  },
//     { title: 'Customer Email', selector: 'email', sortable: true,  },
//     { title: 'DPL Sales Agent', selector: 'employee', sortable: true, },
//     { title: 'Created', selector: 'Created', sortable: true, right: true,},
//   ];

//   return (
//     <>
//     {if (fullEstimates) }
//     <DataTable
//       title="Estimates History"
//       columns={tableColumns}
//       data={fullEstimates}
//     />
//     </>
//   )
// };

// const NoLine = styled.div`
//   border-top: none !important;
//   border-top-width: 0px !important;
//   background: white !important;
// `

// export default HistoryPaginated


class HistoryPaginated extends Component {
  state = {
    loaded: false,
    modalOpen: false,
    estimates: [],
    tableColumns: [
      { name: 'Estimate No.', selector: 'id', sortable: true,  },
      { name: 'Customer Name', selector: 'customer_name', sortable: true,  },
      { name: 'Customer Email', selector: 'customer_email', sortable: true,  },
      { name: 'DPL Sales Agent', selector: 'employee_name', sortable: true, },
      { name: 'Created', selector: 'created_at', sortable: true, right: true,},
    ]
  };

  
  componentDidMount = () => {
    console.log(this.props.eID)
    axios.get(`/api/estimates/`)
    .then(res => 
      this.setState({estimates: [...res.data]}, this.setLoaded(), this.convertDates() ),
      )
    }
    
  convertDates = () => {
    const { estimates } = this.state
    // const dates = []

    const date = new Date
    estimates.map( e => 
      // {const date = new Date
      date.toLocaleDateString('en-US', e.created_at))
    console.log(date)
  }

  handleCloseModal = () => {
    this.setState({modalOpen:false})
  }

  handleOpenModal = () => {
    this.setState({modalOpen:true})
  }

  setLoaded = () => {
    this.setState({loaded: true})
  }

  render () { 
    const { estimates, loaded, tableColumns } = this.state;
    const { name, email, eID, fromHistory, modalOpen } = this.props;

    if (loaded)
      return (
        <>
          <Navbar/>
          <DataTable
            title="Estimates History"
            columns={tableColumns}
            data={estimates}
            // initialPageLength={25}
            // initialSortBy={{ prop: 'id', order: 'descending' }}
            pagination={true}
            pointerOnHover={true}
            onRowClicked={this.handleOpenModal}
          />
          <Modal  
            open={modalOpen}>
          <SummaryPage as={NoLine} eID={eID} submit={this.handleCloseModal} name={name} email={email} fromHistory={true}/>
          <Modal.Actions as={NoLine}>
            <Button onClick={this.handleCloseModal}>
              Done
            </Button>
          </Modal.Actions>
        </Modal>
        </>
      )
    else 
      return (
        <Loader>
          Loading history Page. Please Wait... 
        </Loader>
      )
  }
}

const NoLine = styled.div`
  border-top: none !important;
  border-top-width: 0px !important;
  background: white !important;
`

export default HistoryPaginated
