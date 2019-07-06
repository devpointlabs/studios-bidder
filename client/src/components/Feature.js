import React, {useState,} from 'react';
import {Table, Icon, Button,Form} from 'semantic-ui-react'
import axios from 'axios'

const Feature = (props) => {
  const [editing, setEditing] = useState(false)

  const [name, setName] = useState('')
  const [tempName, setTempName] = useState('')
  const [description, setDescription] = useState('')
  const [tempDescription, setTempDescription] = useState('')

  const [base_days, setBase_days] = useState('')
  const [tempBase_days, setTempBase_days] = useState('')

  const [multiplier, setMultiplier] = useState('')
  const [tempMultiplier, setTempMultiplier] = useState('')

  const handleSubmit=()=>{
    setEditing(false)
    setName(tempName)
    setDescription(tempDescription)
    setBase_days(tempBase_days)
    setMultiplier(tempMultiplier)
    axios.put(`/api/features/${props.id}`,{feature:{name, description, base_days, multiplier}})
  }

  const toggleEdit=()=>{
    setEditing(!editing)

    // copy the current value into the temp values
    setTempName(name)
    setTempDescription(description)
  }

  const editForm = (
    <>
        <Button icon color="grey" onClick={toggleEdit}><Icon name="cancel"/></Button>
      <Form>
        <Form.Group>
        <Form.Input 
          label='Name'
          value={tempName}
          name="name"
          onChange={(e)=> setTempName((e.target.value))}
          required
        />
        <Form.Input
          label='Description'
          placeholder={tempDescription}
          value={tempDescription}
          name="Description"
          onChange={(e)=> setTempDescription((e.target.value))}
          required
        />
        <Form.Input
          label='Multiplier'
          type="number"
          placeholder="1"
          value={tempMultiplier}
          name="multiplier"
          onChange={(e)=> setTempMultiplier((e.target.value))}
          required
        />
        <Form.Input
          label='Developer'
          type="number"
          placeholder="5"
          value={tempBase_days}
          name="devDays"
          onChange={(e)=> setTempBase_days(e.target.value)}
          required
        />
        </Form.Group>
    </ Form>
        <Button icon color="green" onClick={handleSubmit}>
          <Icon name="save"/>
        </Button>
        </>
  )


  const featureDisplay=(
      <Table>
        <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Button icon color="blue" onClick={toggleEdit}><Icon name="pencil"/></Button>
          </Table.Cell>
          <Table.Cell>
            {props.name}        
          </Table.Cell>
          <Table.Cell>
            {props.description}
          </Table.Cell>
          <Table.Cell>
            {props.base_days}
          </Table.Cell>
          <Table.Cell>
            {props.multiplier}
          </Table.Cell>
          <Table.Cell>
            <Button icon color="red" onClick={()=>props.delete(props.id)}>
              <Icon name="trash"/>
            </Button>
          </Table.Cell>
          </Table.Row>
          </Table.Body>
      </Table>
    )


  return(
   <div>
      {editing? editForm:featureDisplay}
      </div>
   
  )
}

export default Feature;