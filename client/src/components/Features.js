import React, {useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Form, Container, Header,} from 'semantic-ui-react';
import { MathContext} from '../providers/MathProvider';
import DarkText from "../styles/DarkText";
import Colors from "../styles/Colors";


const Features = (props) => {
  const [platforms, setPlatforms] = useState([])
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const { handleSetPrice } = useContext(MathContext);
  const { handleSetDays } = useContext(MathContext);

  useEffect( () => {
    axios.get(`/api/platforms`)
    .then(res=>setPlatforms(res.data))

  //     axios.get(`/api/${}/categories`)
  //   .then( res  => {
  //     setCategories(res.data)
  //   })
  //   axios.get(`/api/features`)
  //     .then(res => setFeatures(res.data))
  },[])
  
  useEffect( () => {
    handleSetPrice(props.OS)
  },[props.selectedFeatures])
  
  const getSelectedFeatureData = (id) => {
    const selected = features.filter( f => {if (f.id === parseInt(id)) return f})
    handleSetDays(props.OS, ...selected)
  };
    
  const handleChange = (e) => {
    if (props.selectedFeatures.includes(e.target.value) === false) {props.handleSelections([...props.selectedFeatures, e.target.value])
    }else props.handleSelections(props.selectedFeatures.filter(f => f !== e.target.value));

    getSelectedFeatureData(e.target.value);
   //NEED TO HANDLE RADIO BUTTONS AND PRICING CHANGES BASED ON CLICKS AS WELL
  };


  const exclusiveRendering = (catID, is_exclusive) => {
    let correctF = features.filter( f => catID === f.category_id);
    if (is_exclusive === true) {
      // return (
      //   // <>
      //   //   {correctF.map( f => (
      //   //     <Form.Group key={f.id}>
      //   //       <Form.Radio
      //   //         name={f.name}
      //   //         checked={value === f.id}
      //   //         value={f.id}
      //   //         label={f.name}
      //   //         onChange={handleChange}
      //   //         />
      //   //     </Form.Group>
      //   //   ))}
      //   // </>
      //   );
      }else {
        return (
          <Form.Group>
            {correctF.map( f => (
              <Form.Input
                checked={props.selectedFeatures.includes(f.id.toString())}
                key={f.id}
                type='checkbox'
                name={f.name}
                value={f.id}
                label={f.name}
                onChange={handleChange}
              />
            ))}
          </Form.Group>
        );
      };
    };

    const handleSubmit = () => {

    }

  return (
    <>
        <br/>
        <br/>
        <Form onSubmit={handleSubmit()}>
          {categories.map(c => 
          <>
            <Container textAlign="center" key={c.id} id={c.id} as={Colors} colored="white">
              <Header as={DarkText} fSize="medium">{c.name}</Header>
              {exclusiveRendering(c.id, c.is_exclusive)}
            </Container>
            <br/>
            <br/>
            <br/>
          </>
          )}
          {/* <Form.Button>Submit for Quote</Form.Button> */}
        </Form >
    </>
  )
};

export default Features;
