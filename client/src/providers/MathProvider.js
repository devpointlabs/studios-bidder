import React from 'react';
import axios from 'axios';

export const MathContext = React.createContext();
export const Mathonsumer = MathContext.Consumer;

export class MathProvider extends React.Component {
  state = { Web: [
    {base_days: 10, multiplier: 350, },
    {base_days: 10, multiplier: 300, },
    {base_days: 10, multiplier: 500, },
  ], IOS: [
    {base_days: 10, multiplier: 100},
    {base_days: 10, multiplier: 100},
  ], Android: [
    {base_days: 5, multiplier: 100},
  ], } 


  handleID = (IDs, OS) => {
    axios.get(`/api/`)
      .then( res => {
        switch(OS) {
          case 'Web':
          this.setState({Web: [...this.Web, res.data], });
          case 'IOS':
            this.setState({IOS: [...this.IOS, res.data], });
          case 'Android':
            this.setState({Android: [...this.Android, res.data], });
        }
      })
  };

 

  render() {
    return (
      <MathContext.Provider value={{
       ...this.state
      }}>
        {this.props.children}
      </MathContext.Provider>
    );
  };
};

