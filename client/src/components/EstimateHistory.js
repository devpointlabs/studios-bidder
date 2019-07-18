import React, { useState, useEffect, useContext } from 'react';
import _ from 'lodash'
import axios from 'axios'
import { Table, Dropdown, Segment, Search, Label, Modal, Icon, Header, Menu, Button, Dimmer, Loader, Pagination } from 'semantic-ui-react'
import Navbar from './Navbar'
import { FeatureContext} from '../providers/FeatureProvider';
import SummaryPage from './summary/SummaryPage';
import styled from "styled-components";

// import { FeatureContext} from '../providers/FeatureProvider';

const EstimateHistory = () => {
  const {fullEstimates, resetEstimate, handleEstimates } = useContext(FeatureContext)

  /////////////////////
  // Estimates Setup
  /////////////////
  const [estimates, setEstimates] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // resetEstimate()
    axios.get(`/api/estimates`)
      .then(res => setEstimates(res.data))
    handleEstimates()
      // .then(fullEstimates.push(...estimates))
    setIsLoading(false)
  }, [])

  const estimate = (id, name, email, employee_name, created, ) => (
    <Modal open={modalOpen} key={id} trigger={
      <Table.Row  >
        <Table.Cell collapsing textAlign='center'>{id}</Table.Cell>
        <Table.Cell textAlign='center'>{name}</Table.Cell>
        <Table.Cell textAlign='center'>{email}</Table.Cell>
        <Table.Cell textAlign='center'>{employee_name}</Table.Cell>
        <Table.Cell collapsing textAlign='center'>{created}</Table.Cell>
      </Table.Row> 
    }>
       <SummaryPage as={NoLine} eID={id} name={name} email={email} fromHistory={true}/>
       <Modal.Actions as={NoLine}> 
         <Button
          onClick={handleCloseModal}
          labelPosition='right'
          icon='checkmark'
          content='clost estimate'
        />
      </Modal.Actions>
    </Modal>
  )
  ////////////////////////
  // Modal Set Up
  ////////////////////////
  const [modalOpen, setModalOpen] = useState(false);
  
  const handleCloseModal = () => {
    setModalOpen(false)
  }
  const handleOpenModal = () => {
    setModalOpen(true)
  }

  /////////////////////////
  // pagination set up
  ////////////////////////
  const [displayedEstimates, setDisplayedEstimates] = useState([]);
  const [startNum, setStartNum] = useState(0)
  const [endNum, setEndNum] = useState(25)
  // const es = estimates.slice(0,25)
  // displayedEstimates.push(...es)

  const nextPage = () => {
    if (endNum <= estimates.length) {
      const start = (startNum + 25)
      setStartNum(start)
      const end = (endNum +25)
      setEndNum(end)
    }
  }

  const backPage = () => {
    if (startNum >=25) {
      const start = (startNum - 25)
      setStartNum(start)
      const end = (endNum - 25)
      setEndNum(end)
    }
  }

  const getSlice = () => {
    // setIsLoading(false)
    console.log(estimates)
    console.log(fullEstimates)
    const es = fullEstimates.slice(0,25)
    console.log(es)
    displayedEstimates.push(...es)
    console.log(displayedEstimates)
  }

  /////////////////////
  // Search Setup
  /////////////////
  const [searchColumn, setSearchColumn] = useState(['customer_name', 'customer_email'])
  const [searchResults, setSearchResults] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [searchOptions] = useState([
    {key:'name',text:'Name',value:'Name'},
    {key:'email',text:'Email', value:'Email'},
    {key:'employee', text:'Employee', value:'Employee'}
  ])

  const handleResultSelect = (e, { result }) => {
    setSearchValue(result.customer_name)
    handleOpenModal()
  }

  const resultRenderer = ({ customer_name }) => <Label content={customer_name} />
  
  const handleSearchChange = (e, { value }) => {
    setIsLoading(true)
    setSearchValue(value)

    setTimeout(() => {
      if (value.length < 1) {
        console.log('reset')
        setIsLoading(false)
        setSearchResults([])
        return
      }
      
      const re = new RegExp(_.escapeRegExp(value), 'i')
      const isMatch = result => re.test(result.customer_name)

      setIsLoading(false)
      setSearchResults(_.filter(estimates, isMatch))
    }, 300)
  }

  const searchForm = (
    <>
    <Dropdown inline placeholder='Field' options={searchOptions} defaultValue={searchOptions[0].value} onChange={(e)=>setSearchColumn(e.value)}/>
    <Search
      loading={isLoading}
      onResultSelect={handleResultSelect}
      onSearchChange={_.debounce(handleSearchChange, 500, { leading: true, })}
      // onSearchChange={handleSearchChange}
      results={searchResults}
      resultRenderer={resultRenderer}
      value={searchValue}
    />
    </>
  )

  /////////////////////
  // Mail Setup
  /////////////////
  // const sendMail =()=>{
  //   axios.post(`/api/estimate_email`)
  // }

  /////////////////////
  // Sort Setup
  /////////////////
  const [column, setColumn] = useState(null)
  const [direction, setDirection] = useState(null)

  const handleSort = clickedColumn => () => {

    if (column !== clickedColumn) {
      setColumn(clickedColumn)
      setEstimates(_.sortBy(estimates, [clickedColumn]))
      setDirection('ascending')

      return
    }
    setEstimates(estimates.reverse())
    setDirection(direction === 'ascending' ? 'descending' : 'ascending')
  }

  /////////////////////
  // Render History
  /////////////////
  return (
    <>
      <Navbar />
      <Segment style={{color: 'black'}}>
      {isLoading?
      <Dimmer active><Loader>Loading</Loader></Dimmer>
      :
      <Dimmer inactive><Loader>Loading</Loader></Dimmer>
      }
        Search: {searchForm}
          <Table sortable striped stackable compact>
          <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  collapsing
                  textAlign="center"
                  sorted="ascending" //{column === 'id' ? direction : null}
                  onClick={handleSort('id')}
                >
                  Estimate No.
                </Table.HeaderCell>
                <Table.HeaderCell
                  textAlign='center'
                  sorted={column === 'customer' ? direction : null}
                  onClick={handleSort('customer')}
                >
                  Customer Name
                </Table.HeaderCell>
                <Table.HeaderCell 
                  textAlign='center'
                  sorted={column === 'email' ? direction : null}
                  onClick={handleSort('email')}
                >
                  Customer Email
                </Table.HeaderCell>
                <Table.HeaderCell 
                  textAlign='center'
                  sorted={column === 'employee' ? direction : null}
                  onClick={handleSort('employee')}
                >
                  DPL Sales Agent
                </Table.HeaderCell>
                <Table.HeaderCell 
                  collapsing 
                  textAlign='center'
                  sorted={column === 'email' ? direction : null}
                  onClick={handleSort('email')}
                >
                  Created
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                estimates.slice(startNum,endNum).map((e) =>  estimate(e.id, e.customer_name, e.customer_email, e.employee_name, e.created_at))
                // displayedEstimates.map((e) =>  estimate(e.id, e.customer_name, e.customer_email, e.employee_name, e.created_at))
              }
            </Table.Body>
             <Table.Footer>
               <Table.Row>
                 <Table.HeaderCell colSpan='5'>
                   <Menu floated='right' pagination>
                     <Menu.Item icon onClick={backPage}>
                       <Icon name='chevron left' onClick={backPage}/>
                     </Menu.Item>
                     <Menu.Item icon onClick={nextPage}>
                    <Icon name='chevron right' onClick={nextPage}/>
                     </Menu.Item>
                   </Menu>
                 </Table.HeaderCell>
               </Table.Row>
              </Table.Footer>
          </Table>
      </Segment>
      {/* <Button onClick={sendMail}/> */}
      {/* </Segment.Group> */}

    </>
  )
};

const NoLine = styled.div`
  border-top: none !important;
  border-top-width: 0px !important;
  background: white !important;
`

export default EstimateHistory;
