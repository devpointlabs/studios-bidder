import React, {useState, useEffect} from 'react';
import {Form, Header} from 'semantic-ui-react'
import axios from 'axios'


const FeatureForm = () => {
  const [categoryOptions, setCategoryOptions] = useState([])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [base_days, setBase_days] = useState('')
  const [multiplier, setMultiplier] = useState('')



  const handleSubmit=(e)=>{
    axios.post(`/api/categories/${category}/features`,{name, description, base_days, multiplier})
  }

  useEffect(()=>{
    axios.get(`/api/all_categories`)
    .then(res=>{
      setCategoryOptions(res.data)
    })
  },[])

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
        <Form.Select
          label="Category"
          placeholder="Select Category..."
          options={categoryOptions.map(category=> ({key:category.id, value:category.id, text:category.name}))}
          name="category"
          onChange={(e, data)=> setCategory(data.value)}
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
      {/* <Form.Group>
        <Form.Checkbox
          label="Web"
          name='isWeb'
          onChange={(e)=> setIsWeb((e.target.value))}
        />
        <Form.Checkbox
          label="Android"
          name="isAndroid"
          onChange={(e)=> setIsAndroid((e.target.value))}
        />
        <Form.Checkbox
          label="iOS"
          name="isIos"
          onChange={(e)=> setIsIos((e.target.value))}
        />
      </Form.Group> */}
      <Form.Button>Submit</Form.Button>
    </Form>
  )
};

export default FeatureForm;

