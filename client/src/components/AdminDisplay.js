import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Table, Icon} from 'semantic-ui-react'
import FeatureForm from './FeatureForm'
import CategoryForm from './CategoryForm'

const MainDisplay = () => {
  const [features, setFeatures] = useState([])

  const getFeatures=()=>{
    axios.get(`/api/features`)
    .then(res=>{setFeatures(res.data)})
  }


  return(
    <>
    <Navbar/>
      <CategoryForm/>
        <br />
        <hr />
        <br />
      <FeatureForm/>
        <br />
        <hr />
        <br />
      <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="4">Features</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          features.map((feature)=>
          <Table.Row>
            <Table.Cell collapsing><Icon name="arrow circle right"/></Table.Cell>
            <Table.Cell collapsing>{feature.name}</Table.Cell>
            <Table.Cell>{feature.description}</Table.Cell>
            <Table.Cell>{feature.category}</Table.Cell>
            <Table.Cell>{feature.base_days}</Table.Cell>
            <Table.Cell>{feature.base_days}</Table.Cell>
            <Table.Cell>{feature.multiplier}</Table.Cell>
            <Table.Cell><Icon name="trash"/></Table.Cell>
          </Table.Row>
          )
        }
      </Table.Body>
    </Table>
  </>
    )
};

export default MainDisplay;