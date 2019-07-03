import styled from 'styled-components';

const ColorStyled = (colored) => {
    switch(colored) {
      case 'light':
        return 'rgb(129, 104, 177)';
      case 'medium':
        return 'rgb(109, 82, 162)';
      case 'medium-dark':
        return 'rgb(94, 66, 150)';
      case 'dark':
        return 'rgb(63, 39, 115)';
      case 'light-grey':
        return 'rgb(204, 202, 207)';
      case 'dark-grey':
        return 'rgb(50, 49, 51)';
      case 'white':
        return 'white';
      case 'black':
        return 'black';
      default:
        return 'rgb(109, 82, 162)';
    }
  };

export default styled.div`
  background-color: ${props => ColorStyled(props.colored)} !important;
`;