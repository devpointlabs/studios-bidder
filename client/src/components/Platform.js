import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Category from './Category'
import {Form, Button, Icon} from 'semantic-ui-react'
import CategoryForm from './CategoryForm'

const Platform = (props) => {
const [editing, setEditing] = useState(false)
const [categories, setCategories] = useState([])
const [newCategory, setNewCategory] = useState(false)

const [tempName, setTempName] = useState('')

  useEffect(()=>{
    axios.get(`/api/platforms/${props.id}/categories`)
    .then(res=>{setCategories(res.data)})
  },[])

  // passed to the category form so it can update state
  const addCategory = (category) => {
    setCategories([...categories, category])
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.put(`/api/platforms/${props.id}`,{platform:{name:tempName}})
  }


  const deleteCategory =(c_id)=>{
    axios.delete(`/api/categories/${c_id}`)
    setCategories(categories.filter(c => c.id !== c_id))
  }
  
  const PlatformDisplay=(
    <>
      <Button icon color="blue" onClick={()=>setEditing(true)}>
        <Icon name="pencil"/>
      </Button>
      <Button icon color="green" onClick={()=>setNewCategory(!newCategory)}>
        <Icon name="pencil"/>
        {newCategory? 'Cancel':'New Category'} 
      </Button>
      <br />
      <br />
      {newCategory? <CategoryForm  addCategory={addCategory} toggleForm={setNewCategory} p_id={props.id}/> : null}
    </>
  )

  const editForm =(
    <>
    <Form>
      <Form.Input 
        label='Platform Name'
        value={tempName}
        name="name"
        onChange={(e)=> setTempName((e.target.value))}
        required
      />
    </Form>
        <Button icon color="grey" onClick={()=>setEditing(false)}>
        <Icon name="cancel"/>
      </Button>
      <Button icon color="green" onClick={handleSubmit}>
        <Icon name="save"/>
      </Button>
      </>
  )

  return(
    <>
      <h1>{props.name}</h1>
      {editing? editForm:PlatformDisplay}
      {categories.map((category)=> <Category key={category.id} name={category.name} id={category.id} delete={deleteCategory}/>)}
    </>
  )
}

export default Platform;