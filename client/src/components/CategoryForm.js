import React,{useState, useEffect} from 'react';
import axios from 'axios'
import {Form} from 'semantic-ui-react'

const CategoryForm = () => {
  const [platforms, setPlatforms] = useState()

  const [name, setName] = useState('')
  const [isWeb, setIsWeb] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [isExclusive, setIsExclusive] = useState(false)

  const handleSubmit=(e)=>{
    axios.post(`/api/categories`,{
      name,
      isWeb,
      isAndroid,
      isIos,
      isExclusive
    })
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
        <Form.Select
          label="Platform"
          placeholder="Select Platform..."
          options={[{key:'Web', value:'Web', text:'Web'},{key:'Android', value:'Android', text:'Android'},{key:'iOS', value:'iOS', text:'iOS'}]}
          name="platform"
          required
        />
      <Form.Checkbox
        label="Exclusive?"
        name="isExclusive"
        onChange={(e)=> setIsWeb((e.target.value))}
      />
      <Form.Button>Submit</Form.Button>
    </Form>
  )
}

export default CategoryForm;
