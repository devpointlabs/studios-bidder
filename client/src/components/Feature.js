import React, {useState,} from 'react';
import {Table, Icon, Button,Form} from 'semantic-ui-react'
import axios from 'axios'

const Feature = (props) => {
  const [editing, setEditing] = useState(false)
  const [name, ] = useState(props.name)
  const [tempName, setTempName] = useState(props.name)
  const [description, ] = useState(props.description)
  const [tempDescription, setTempDescription] = useState(props.description)
  const [tempBase_days, setTempBase_days] = useState(props.base_days)
  const [tempMultiplier, setTempMultiplier] = useState(props.multiplier)

  const handleSubmit=()=>{
    setEditing(false)
    axios.put(`/api/features/${props.id}`,{feature:{name:tempName, description:tempDescription, tempBase_days, tempMultiplier}})
  }

  const toggleEdit=()=>{
    setEditing(!editing)

    // copy the current value into the temp values
    setTempName(name)
    setTempDescription(description)
  }

    const Feature=(
      <Form>
        <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>
              {editing?
                <Button icon color="grey" onClick={toggleEdit}><Icon name="cancel"/></Button>
                :
                <Button icon color="blue" onClick={toggleEdit}><Icon name="pencil"/></Button>
              }
            </Table.Cell>
            <Table.Cell collapsing>
              {editing? 
                <Form.Input label='Name' value={tempName} name="name" onChange={(e)=> setTempName((e.target.value))} required/> 
                :
                props.name
              }        
            </Table.Cell>
            <Table.Cell>
              {editing?
                <Form.Input label='Description' placeholder={tempDescription} value={tempDescription} name="description" onChange={(e)=> setTempDescription((e.target.value))} required/>
                :
                props.description
              }
            </Table.Cell>
            <Table.Cell collapsing textAlign='right'>
              {editing?
                <Form.Input label='Multiplier' value={tempMultiplier} name="multiplier" onChange={(e)=> setTempMultiplier((e.target.value))} required/> 
                :
                props.multiplier
              }
            </Table.Cell>
            <Table.Cell collapsing textAlign='right'>
              {editing?
                <Form.Input label='Developer Days' value={tempBase_days} name="base_days" onChange={(e)=> setTempBase_days((e.target.value))} required/> 
                :
                props.base_days
              }
            </Table.Cell>
            <Table.Cell collapsing textAlign='right'>
              {editing?
                <Button icon color="green" onClick={handleSubmit}><Icon name="save"/></Button>
                :
                <Button icon color="red" onClick={()=>props.delete(props.id)}><Icon name="trash"/></Button>
              }
            </Table.Cell>
            </Table.Row>
            </Table.Body>
        </Table>
      </Form>
    )

  return(
   <div>
      {Feature}
      </div>
   
  )
}

export default Feature;