import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import axios from 'axios'
import { Table, Form, Header, Segment, Search, Label } from 'semantic-ui-react'

const EstimateHistory = () => {
  const [estimates, setEstimates] = useState([])

  /////////////////////
  // Search Setup
  /////////////////
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const handleResultSelect = (e, { result }) => {
    setSearchValue(result.customer_name)
  }

  const resultRenderer = ({ customer_name }) => <Label content={customer_name} />

  const handleSearchChange = (e, { value }) => {

    // Show the spinner while user is typing
    setIsLoading(true)

    // Echo the typed chars back to the search box
    setSearchValue(value)

    setTimeout(() => {
      if (searchValue.length < 1) return (
        setIsLoading(false), setSearchResults([]), setSearchValue('')
      )

      const re = new RegExp(_.escapeRegExp(searchValue), 'i')
      const isMatch = result => re.test(result.customer_name)

      setIsLoading(false)
      setSearchResults(_.filter(estimates, isMatch))
      console.log(searchResults)
    }, 700)
  }

  useEffect(() => {
    axios.get(`/api/estimates`)
      .then(res => setEstimates(res.data))
  }, [])

  const estimate = (id, name, email, created) => (
    <Table.Row>
      <Table.Cell collapsing textAlign='center'>{id}</Table.Cell>
      <Table.Cell textAlign='center'>{name}</Table.Cell>
      <Table.Cell textAlign='center'>{email}</Table.Cell>
      <Table.Cell textAlign='center'></Table.Cell>
      <Table.Cell collapsing textAlign='center'>{created}</Table.Cell>
    </Table.Row>
  )

  const searchForm = (
    <Search
      loading={isLoading}
      onResultSelect={handleResultSelect}
      onSearchChange={_.debounce(handleSearchChange, 500, { leading: true, })}
      results={searchResults}
      resultRenderer={resultRenderer}
      value={searchValue}
    />
  )
  return (
    <>
      <Segment style={{color: 'black'}}>
        Search: {searchForm}
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing textAlign="center">Estimate No.</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Customer Name</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Customer Email</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>DPL Sales Agent</Table.HeaderCell>
              <Table.HeaderCell collapsing textAlign='center'>Created</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              estimates.map((e) => estimate(e.id, e.customer_name, e.customer_email, e.created_at))
            }
          </Table.Body>
        </Table>
      </Segment>
    </>
  )
};

export default EstimateHistory;