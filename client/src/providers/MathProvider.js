import React from 'react';

export const MathContext = React.createContext();
export const Mathonsumer = MathContext.Consumer;

export class MathProvider extends React.Component {
  state = { 
    web: [
    {base_days: 10, multiplier: 350, },
    {base_days: 10, multiplier: 300, },
    {base_days: 10, multiplier: 500, },
    ], 
    iOS: [
    {base_days: 10, multiplier: 100},
    {base_days: 10, multiplier: 100},
    ], 
    android: [
    {base_days: 5, multiplier: 100},
    ], 
    iOSPrice: 0, 
    webPrice: 0, 
    androidPrice: 0,
  };  

  handleSetPrice = (os) => {
    const reducerFunction = (os) => os.reduce( (acc, cur, ) => acc + (cur.base_days * cur.multiplier), 0)
    if (os === 'web'){
      const {web} = this.state;
      this.setState({webPrice: reducerFunction(web)});
    } else if(os === 'android'){
      const {android} = this.state;
      this.setState({androidPrice: reducerFunction(android)});
    } else if(os === 'iOS'){
      const {iOS} = this.state;
      this.setState({iOSPrice: reducerFunction(iOS)});
    };
  };
    
  render() {
    return (
      <MathContext.Provider value={{
       ...this.state,
       handleSetPrice: this.handleSetPrice,
      }}>
        {this.props.children}
      </MathContext.Provider>
    );
  };
};

