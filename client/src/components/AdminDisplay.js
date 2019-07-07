import React, {useState, useEffect} from 'react';
import axios from 'axios'
import FeatureForm from './FeatureForm'
import CategoryForm from './CategoryForm'
import Navbar from './Navbar';
import Category from './Category'
import Platform from './Platform'

const AdminDisplay = () => {
  const [categories, setCategories] = useState([])
  const [platforms, setPlatforms] = useState([])

  const deleteCategory =(c_id)=>{
    axios.delete(`/api/categories/${c_id}`)
  }

  useEffect(()=>{
    axios.get(`/api/all_categories`)
    .then(res=>{setCategories(res.data)})
    
    axios.get(`/api/platforms`)
    .then(res=>{setPlatforms(res.data)})
  },[])
  
  return(
    <>
      <Navbar/>
      {platforms.map((platform)=> <Platform key={platform.id} name={platform.name} id={platform.id} />)}
      
    </>
  )
};

export default AdminDisplay;