import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Button, Icon, Form} from 'semantic-ui-react'
import Feature from './Feature'
import FeatureForm from './FeatureForm'

const Category = (props) => {
  const [features, setFeatures] = useState([])
  const [editing, setEditing] = useState(false)
  const [newFeature, setNewFeature] = useState(false)

  const [name, setName] = useState(props.name)
  const [tempName, setTempName] = useState(props.name)

  useEffect(()=>{  
    axios.get(`/api/categories/${props.id}/features`)
    .then(res=>{setFeatures(res.data)})}
  ,[])

  const deleteFeature =(f_id)=>{
    axios.delete(`/api/features/${f_id}`)
  }

  const toggleEdit=()=>{
    setEditing(!editing)
  }

  const handleSubmit=()=>{
    setName(tempName)
    axios.put(`/api/categories/${props.id}`,{category:{name:tempName}})

  }

  const editForm = (
    <>
    <Form>
      <Form.Input 
        label='Category Name'
        value={tempName}
        name="name"
        onChange={(e)=> setTempName((e.target.value))}
        required
      />
    </Form>
    <Button size='small' icon color="grey" onClick={toggleEdit}>
      <Icon name="cancel"/>
    </Button>
    <Button size='small' icon color="green" onClick={handleSubmit}>
      <Icon name="save"/>
    </Button>
    </>
  )

  const toggleNewFeature=()=>{
    setNewFeature(!newFeature)

  }


  const categoryDisplay = (
    <>
      <h3>{props.name}</h3>
      <Button size='small' icon color="blue" onClick={toggleEdit}>
        <Icon name="pencil"/>
      </Button>
      <Button size='small' icon color="red" onClick={()=>props.delete(props.id)}>
        <Icon name="trash"/>
      </Button>
      <Button size='small' icon color="green" onClick={toggleNewFeature}>
        <Icon name="pencil"/>
        {newFeature? 'Cancel':'New Feature'} 
      </Button>
      <br />
      <br />
      {newFeature? <FeatureForm c_id={props.id}/> : null}
    </>
  )

  return(
    <div>
      {editing? editForm : categoryDisplay}
      {features.map((feature)=> 
      <Feature 
        key={feature.id}
        id={feature.id}
        name={feature.name}
        description={feature.description}
        base_days={feature.base_days}
        multiplier={feature.multiplier}
        category={feature.category_id}
        delete={deleteFeature}
      />)}
      <br/>
      <br/>
    </div>

  )
}

export default Category;