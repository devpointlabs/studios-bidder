import React, { useState, useEffect, useContext } from 'react';
import _ from 'lodash'
import axios from 'axios'
import { Table, Dropdown, Segment, Search, Label, Modal, Icon, Header, Menu, Button, Dimmer, Loader, Pagination } from 'semantic-ui-react'
import Navbar from './Navbar'
import { FeatureContext} from '../providers/FeatureProvider';
import { HistoryContext} from '../providers/HistoryProvider';
import HistorySummary from './summary/HistorySummary';
import styled from "styled-components";

// import { FeatureContext} from '../providers/FeatureProvider';
 
const EstimateHistory = () => {
  const {resetEstimate, handleResetIDs } = useContext(FeatureContext)
<<<<<<< HEAD
  const { handleHistoryIDs, handleHistoryCategories, handleEstimate, featureIDsFromHistory, dumpHistory, featuresFromHistory, categoriesFromHistory, resetFeatureIDsFromHistory} = useContext(HistoryContext)
=======
  const { handleHistoryIDs, handleHistoryCategories, handleEstimate, featureIDsFromHistory, resetFeatureIDsFromHistory, dumpHistory, featuresFromHistory, categoriesFromHistory, } = useContext(HistoryContext)
>>>>>>> 5f88238c8d3da07b83a590479bd3d41a7a3c23d3
  const [estimates, setEstimates] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [anyClick, setAnyClick] = useState(false)
  const [modalOpen, setModalOpen] = useState(false);
  const [displayedEstimates, setDisplayedEstimates] = useState([]);
  const [startNum, setStartNum] = useState(0)
  const [endNum, setEndNum] = useState(15)
  const [pageItemCount, setPageItemCount] = useState(15)
  const [estimate, setEstimate] = useState({})
  const [features, setFeatures] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')
  const [searchColumn, setSearchColumn] = useState(['customer_name', 'customer_email'])
  const [searchResults, setSearchResults] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [column, setColumn] = useState(null)
  const [direction, setDirection] = useState(null)
  const [searchOptions] = useState([
    {key:'name',text:'Name',value:'Name'},
    {key:'email',text:'Email', value:'Email'},
    {key:'employee', text:'Employee', value:'Employee'}
  ])
  
  useEffect(() => {
    axios.get(`/api/estimates`)
      .then(res => setEstimates(res.data))

    setIsLoading(false)

  }, [])

 

  const buildEstimate = ((estimateFromMap, id) => {
    return new Promise((resolve,) => {

      // axios.get(`/api/estimates/${id}`)
      //   .then(res => { 
          setEstimate(estimateFromMap) 
          // resetFeatureIDsFromHistory()
          // featureIDsFromHistory.push(...estimateFromMap.feature_array)
          // setFeatures(featureIDsFromHistory)
          handleEstimate(id)
      //     // handleEstimate(id)
      //     // handleHistoryIDs()
      //   })
///////////////////////
      // axios.get(`/api/featureIDs_from_estimate/${id}`)
      //   .then(res => {featureIDsFromHistory.push(...res.data)
        
      //   })
      // axios.get(`/api/features_by_id/${featureIDsFromHistory}`)
      // .then(res => featuresFromHistory.push(...res.data))
      
      ///////////////////////////////////
        
      // setEstimate(estimate)

      resolve (featuresFromHistory)
    });
  });


  const handleOpenModal = async (estimateFromMap, id, name, email) => {

    const featuresFromHistory = await buildEstimate(estimateFromMap, id)

    passProps(id, name, email)
    console.log(id)
    // handleEstimate(id)
    // handleHistoryIDs()
    // axios.get(`/api/categories_by_feature_id/${featureIDsFromHistory}`)
    //   .then(res => categoriesFromHistory.push(...res.data))
    // // handleHistoryCategories()
    setModalOpen(true)


  };















  // const handleOpenModal = (id, name, email) => {
  //   // debugger
  //   handleEstimate(id)
  //   handleHistoryIDs()
  //   passProps(id, name, email)
  //   setModalOpen(true)
  // }


  const handleCloseModal = () => {
    setModalOpen(false)
    resetFeatureIDsFromHistory()
    // debugger
    // handleResetIDs()
    // dumpHistory()
  }

  const passProps = (id, name, email) => {
    setId(id)
    setName(name)
    setEmail(email)
  }

  const estimateRow = (estimateFromMap, id, name, email, employee_name, created, ) => (
    <Table.Row onClick={() => {//handleEstimate(id)
                               featureIDsFromHistory.push(...estimateFromMap.feature_array)
                               handleOpenModal(estimateFromMap, id, name, email)}}>
      <Table.Cell collapsing textAlign='center'>{id}</Table.Cell>
      <Table.Cell textAlign='center'>{name}</Table.Cell>
      <Table.Cell textAlign='center'>{email}</Table.Cell>
      <Table.Cell textAlign='center'>{employee_name}</Table.Cell>
      <Table.Cell collapsing textAlign='center'>{created}</Table.Cell>
    </Table.Row> 
  )

  const nextPage = () => {
    if (endNum <= estimates.length) {
      const start = (startNum +pageItemCount)
      setStartNum(start)
      const end = (endNum +pageItemCount)
      setEndNum(end)
    }
  }

  const backPage = () => {
    if (startNum >=pageItemCount) {
      const start = (startNum - pageItemCount)
      setStartNum(start)
      const end = (endNum - pageItemCount)
      setEndNum(end)
    }
  }

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
    {/* <Dropdown inline placeholder='Field' options={searchOptions} defaultValue={searchOptions[0].value} onChange={(e)=>setSearchColumn(e.value)}/> */}
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

  /////////////////////
  // Mail Setup
  /////////////////
  // const sendMail =()=>{
  //   axios.post(`/api/estimate_email`)
  // }

  return (
    <>
      <Navbar />
      <Segment style={{color: 'black'}}>
      {isLoading?
      <Dimmer active><Loader>Loading</Loader></Dimmer>
      :
      <Dimmer inactive><Loader>Loading</Loader></Dimmer>
      }
        Search by customer name: {searchForm}
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
                estimates.slice(startNum,endNum).map((e) =>  estimateRow(e, e.id, e.customer_name, e.customer_email, e.employee_name, e.created_at.slice(0, 10)))
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
        <Modal open={modalOpen} onClose={handleCloseModal}>
        <HistorySummary estimate={estimate} as={NoLine} eID={id} name={name} email={email} fromHistory={true}/>
          {/* <Modal.Actions as={NoLine}> 
            <Button
              onClick={handleCloseModal}
              labelPosition='right'
              icon='checkmark'
              content='clost estimate'
            />
          </Modal.Actions> */}
        </Modal>
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
