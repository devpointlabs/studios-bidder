import styled from 'styled-components';

const fontSize = (size) => {
    switch(size) {
      case 'large':
        return '40px';
      case 'small':
        return '25px';
      default:
        return '20px';
    }
  };
   
//   export const HeaderText = styled.h1`
// ^ this also works, but if this is the default then it doesnt need a name. 
// if you DONT have it as the default when you import it elsewhere, then you you need to import as { HeaderText }
// if you DO have it like below as the default then no need for {} and can actually call it anything you want in the import file

export default styled.h1`
    color: #6c54a0 !important;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    font-size: ${props => fontSize(props.fSize)} !important;
    
    /* Ternary - great for two options */
    /* font-size: ${props => props.large ? '4rem' : '2rem'} !important; */
  `;