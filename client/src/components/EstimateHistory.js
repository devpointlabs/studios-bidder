import React, { useState, useEffect, useContext } from 'react';
import _ from 'lodash'
import axios from 'axios'
import { Table, Dropdown, Segment, Search, Label, Modal, Header, Button } from 'semantic-ui-react'
import Navbar from './Navbar'
import SummaryPage from './summary/SummaryPage';
import styled from "styled-components";
import { FeatureContext} from '../providers/FeatureProvider';

const EstimateHistory = () => {
  const [estimates, setEstimates] = useState([])
  
  /////////////////////
  // Search Setup
  /////////////////
  
  const [column, setColumn] = useState(null)
  const [direction, setDirection] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchColumn, setSearchColumn] = useState(['customer_name', 'customer_email'])
  const [searchResults, setSearchResults] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [modalOpen, setModalOpen] = useState(false);
  const [searchOptions] = useState([
    {key:'name',text:'Name',value:'Name'},
    {key:'email',text:'Email', value:'Email'},
    {key:'employee', text:'Employee', value:'Employee'}
  ])
  const { featuresLoaded, setFeaturesLoaded, handleFeatures, handleCategories, featureIDsFromEstimate, handleSelectedIDs, handleResetIDs} = useContext(FeatureContext);


  const handleResultSelect = (e, { result }) => {
    setSearchValue(result.customer_name)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }
  const handleOpenModal = () => {
    setModalOpen(true)
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

  const sendMail =()=>{
    axios.post(`/api/estimate_email`)
  }

  useEffect(() => {
    axios.get(`/api/estimates`)
      .then(res => setEstimates(res.data))
  }, [])

  const estimate = ({id, name, email, employee_name, created}) => (
    <Modal open={modalOpen} key={id} trigger={
      <Table.Row onClick={handleOpenModal}>
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

  return (
    <>
      <Navbar />
      <Segment style={{color: 'black'}}>
        Search: {searchForm}
          <Table sortable striped stackable compact>
          <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  collapsing
                  textAlign="center"
                  sorted={column === 'id' ? direction : null}
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
                estimates.map((e) =>  estimate(e.id, e.customer_name, e.customer_email, e.employee_name, e.created_at))
              }
            </Table.Body>
          </Table>
      </Segment>
      <Button onClick={sendMail}/>
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