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
    webPrice: '', 
    iOSPrice: '', 
    androidPrice: '' ,
  };  

  handleSetPrice = (os) => {
    if (os === 'Web'){
      const {web} = this.state;
      let webTotal = web.reduce( (acc, cur, ) => acc + (cur.base_days * cur.multiplier), 0);
      this.setState({webPrice: webTotal},);
    } else if(os === 'Android'){
      const {android} = this.state;
      let androidTotal = android.reduce( (acc, cur, ) => acc + (cur.base_days * cur.multiplier), 0);
      this.setState({androidPrice: androidTotal}, );
    } else if(os === 'IOS'){
      const {iOS} = this.state;
      let iosTotal = iOS.reduce( ( acc, cur, ) => acc + (cur.base_days * cur.multiplier), 0);
      this.setState({iOSPrice: iosTotal},);
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

