import styled from 'styled-components';

const position = (side) => {
  switch(side){
    case'left':
      return 'right';
    case'right':
      return 'left';
    default:
      return 'center';
  };
};

export const Table = styled.table`
  margin: auto;
  padding: 0em 5em;;
`;
export const  Row = styled.tr`
  width: 75%;
  height: 10vh;
`;
export const Cell = styled.td`
  text-align: ${props => position(props.position)};
  padding: 10px;
  font-size: 0.3vw;
`;

export const SliderCell = styled.td`
  width: 65%;

`;