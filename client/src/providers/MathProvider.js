import React from 'react';

export const MathContext = React.createContext();
export const MathConsumer = MathContext.Consumer;

export class MathProvider extends React.Component {
  state = { 
    webDays: [], 
    iOSDays: [], 
    androidDays: [], 
    iOSPrice: 0, 
    webPrice: 0, 
    androidPrice: 0,
  };  

  handleSetPrice = (os) => {
    const reducerFunction = (os) => os.reduce( (acc, cur, ) => acc + (cur.base_days * cur.multiplier), 0)
    if (os === 'web'){
      const {webDays} = this.state;
      this.setState({webPrice: reducerFunction(webDays)});
    } else if(os === 'android'){
      const {androidDays} = this.state;
      this.setState({androidPrice: reducerFunction(androidDays)});
    } else if(os === 'ios'){
      const {iOSDays} = this.state;
      this.setState({iOSPrice: reducerFunction(iOSDays)});
    };
  };

  handleSetDays = (os, feature, selectedFeatures) => {
    if (os === 'web'){
      this.setState({webDays: [...this.state.webDays, {base_days: feature.base_days, multiplier: feature.multiplier, id: feature.id}]})
    } else if(os === 'ios'){
      this.setState({iOSDays: [...this.state.iOSDays, {base_days: feature.base_days, multiplier: feature.multiplier, id: feature.id}]})
    } else if(os === 'android'){
      this.setState({androidDays: [...this.state.androidDays, {base_days: feature.base_days, multiplier: feature.multiplier, id: feature.id}]})
    };
  };
    
  render() {

      const {webPrice} = this.state
      const {iOSPrice} = this.state
      const {androidPrice} = this.state
    
    return (
      <MathContext.Provider value={{
       ...this.state,
       webPrice, iOSPrice, androidPrice,
       handleSetPrice: this.handleSetPrice,
       handleSetDays: this.handleSetDays,
      }}>
        {this.props.children}
      </MathContext.Provider>
    );
  };
};

 