  // const generateFeatures = (category) => {
  //   axios.get(`/api/features`, {params: {category_id: category}})
  //   .then( res => {
  //     setFeatures(res.data)
  //     console.log(features)
  //   });
  //   return(
  //     features.map(f => 
  //       <Segment.Content>{f.name}</Segment.Content>)
  //   )
  // };

//   <Table.Body>
//   {
//     contacts.map( contact => ( 
//         <Contact key={contact.id} {...contact} remove={remove} />
//     ))
//   }
// </Table.Body>

// import React from "react";
// import { Button, Table, Icon } from "semantic-ui-react";

// const Features = ({ id, name, description, remove }) => (
//   <Table.Row>
//     <Table.HeaderCell>{name}</Table.HeaderCell>
//     <Table.HeaderCell>{phone}</Table.HeaderCell>
//     <Table.Cell>
//         <Button color="red" icon onClick={() => remove(id)}>
//             <Icon name="cut"/>
//             Delete
//         </Button>
//     </Table.Cell>
//   </Table.Row> 
// );

// export default Contact;
