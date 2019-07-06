import React, {useState, useEffect} from 'react';
import axios from 'axios'
import FeatureForm from './FeatureForm'
import CategoryForm from './CategoryForm'
import Navbar from './Navbar';
import Category from './Category'

const AdminDisplay = () => {
  const [categories, setCategories] = useState([])

  const deleteCategory =(c_id)=>{
    axios.delete(`/api/categories/${c_id}`)
  }

  useEffect(()=>{
    axios.get(`/api/all_categories`)
    .then(res=>{setCategories(res.data)})
    
    // axios.get(`/api/platforms`)
    // .then(res=>{setPlatforms(res.data)})
  },[])
  
  return(
    <>
      <Navbar/>
      <CategoryForm/>
      <br />
      <hr />
      <br />
      <FeatureForm />
      <br />
      <hr />
      <br />
      {categories.map((category)=> <Category key={category.id} name={category.name} category={category.id} delete={deleteCategory}/>)}
    </>
  )
};

export default AdminDisplay;