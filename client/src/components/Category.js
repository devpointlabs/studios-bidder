import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Button, Icon,} from 'semantic-ui-react'
import Feature from './Feature'

const Category = (props) => {
  const [features, setFeatures] = useState([])

  useEffect(()=>{  
    axios.get(`/api/categories/${props.category}/features`)
    .then(res=>{setFeatures(res.data)})}
  ,[])

  const deleteFeature =(f_id)=>{
    axios.delete(`/api/features/${f_id}`)
  }

  return(
    <div>
      <h1>{props.name}</h1>
      <Button icon color="red" onClick={()=>props.delete(props.category)}>
      <Icon name="trash"/>
    </Button>
    <hr/>
    <br/>
    <br/>
      {features.map((feature)=> 
      <Feature 
        key={feature.id}
        id={feature.id}
        name={feature.name}
        description={feature.description}
        baseDays={feature.base_days}
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