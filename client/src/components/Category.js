import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Table, Button, Icon} from 'semantic-ui-react'
import Feature from './Feature'

const Category = (props) => {
  const [features, setFeatures] = useState([])

  useEffect(()=>{  
    axios.get(`/api/categories/${props.category}/features`)
    .then(res=>{setFeatures(res.data)})}
  ,[])

  const deleteFeature =(f_id)=>{
    axios.delete(`/api/features/${f_id}`)
  }

  return(
    <Table>
        <Table.Header>
          <Table.Row >
          <Table.HeaderCell colSpan='5'>{props.name}</Table.HeaderCell>
          <Table.HeaderCell><Button icon color="red" onClick={()=>props.delete(props.category)}>
          <Icon name="trash"/>
        </Button></Table.HeaderCell>
          </Table.Row>
          <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Multiplier</Table.HeaderCell>
          <Table.HeaderCell>Dev Days</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {features.map((feature)=> 
          <Feature 
            key={feature.id}
            id={feature.id}
            name={feature.name}
            description={feature.description}
            baseDays={feature.base_days}
            multiplier={feature.multiplier}
            category={feature.category_id}
            delete={deleteFeature}
          />)}
        </Table.Body>
      </Table>
  )
}

export default Category;