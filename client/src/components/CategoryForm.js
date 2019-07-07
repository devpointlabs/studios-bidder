import React,{useState, useEffect} from 'react';
import axios from 'axios'
import {Form} from 'semantic-ui-react'

const CategoryForm = (props) => {
  // const [platforms, setPlatforms] = useState([])
  const [name, setName] = useState('')
  const [isExclusive, setIsExclusive] = useState(false)
  // const [platform, setPlatform] = useState('')

  // useEffect(()=>{
  //   axios.get(`/api/platforms`)
  //   .then(res=>setPlatforms(res.data))
  // },[])

  const handleSubmit=(e)=>{
    axios.post(`/api/platforms/${props.p_id}/categories`,{name, isExclusive})
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Input
        label="Category Name"
        placeholder="Category Name..."
        value={name}
        name="name"
        onChange={(e)=> setName((e.target.value))}
        required
      />
        {/* <Form.Select
          label="Platform"
          placeholder="Select Platform..."
          options={platforms.map((p)=>({key:p.id, value:p.id, text:p.name}))}
          name="platform"
          onChange={(e, data)=>setPlatform(data.value)}
          required
        /> */}
      <Form.Checkbox
        label="Exclusive?"
        name="isExclusive"
        onChange={(e)=> setIsExclusive((e.target.value))}
      />
      <Form.Button>Submit</Form.Button>
    </Form>
  )
}

export default CategoryForm;
