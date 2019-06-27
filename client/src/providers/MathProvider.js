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
  ], WebPrice: '',}
  // price: {Web: 0, IOS: '', Android: ''} } 

// sets state based on when user clicks a feature
  handleID = (IDs, OS) => {
      switch(OS) {
        case 'Web':
        this.setState({Web: [...this.Web, res.data], });
        case 'IOS':
          this.setState({IOS: [...this.IOS, res.data], });
        case 'Android':
          this.setState({Android: [...this.Android, res.data], });
      }
    }

  updateOsTotals = (os, total) => {
    // const {price} = this.state
    if (os === 'Web') this.setState({[this.state.WebPrice]: total})
    debugger
  };
 

  render() {
    return (
      <MathContext.Provider value={{
       ...this.state,
       updateOsTotals: this.updateOsTotals,
      }}>
        {this.props.children}
      </MathContext.Provider>
    );
  };
};

