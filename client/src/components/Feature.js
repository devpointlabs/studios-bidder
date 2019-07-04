import React, {useState, useEffect} from 'react';
import {Table, Icon, Button} from 'semantic-ui-react'

const Feature = (props) => {
  const [editing, setEditing] = useState(false)
  
  useEffect(()=>{},[])

  return(
    <Table.Row>
      <Table.Cell collapsing>
        {
          editing?
          <Button icon color="grey" onClick={()=>setEditing(false)}><Icon name="cancel"/></Button>
          :
          <Button icon color="blue" onClick={()=>setEditing(true)}><Icon name="pencil"/></Button>
        }
      </Table.Cell>
      <Table.Cell collapsing>{props.name}</Table.Cell>
      <Table.Cell>{props.description}</Table.Cell>
      <Table.Cell>{props.base_days}</Table.Cell>
      <Table.Cell>{props.multiplier}</Table.Cell>
      <Table.Cell>
        <Button icon color="red" onClick={()=>props.delete(props.id)}>
          <Icon name="trash"/>
        </Button>
      </Table.Cell>
    </Table.Row>
  )
}

export default Feature;