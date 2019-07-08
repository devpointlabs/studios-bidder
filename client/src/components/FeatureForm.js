import React, {useState, useEffect} from 'react';
import {Form, } from 'semantic-ui-react'
import axios from 'axios'


const FeatureForm = (props) => {
  const [categoryOptions, setCategoryOptions] = useState([])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [base_days, setBase_days] = useState('')
  const [multiplier, setMultiplier] = useState('')

  const handleSubmit=(e)=>{
    axios.post(`/api/categories/${props.c_id}/features`,{name, description, base_days, multiplier})
  }

  return(
    <Form onSubmit={handleSubmit}>
    <Form.Group>
      <Form.Input
        label="Feature Name"
        placeholder="Feature Name..."
        value={name}
        name="name"
        onChange={(e)=> setName((e.target.value))}
        required
      />
      <Form.Input
        label="Developer Days"
        type="number"
        placeholder="5"
        value={base_days}
        name="devDays"
        onChange={(e)=> setBase_days(e.target.value)}
        required
      />
      <Form.Input
        label="Multiplier"
        type="number"
        placeholder="1"
        value={multiplier}
        name="multiplier"
        onChange={(e)=> setMultiplier((e.target.value))}
        required
      />
    </Form.Group>

    <Form.TextArea
      label="Feature Description"
      placeholder=""
      value={description}
      name="Description"
      onChange={(e)=> setDescription((e.target.value))}
      required
    />
    <Form.Button>Submit</Form.Button>
    </Form>
  )
};

export default FeatureForm;

