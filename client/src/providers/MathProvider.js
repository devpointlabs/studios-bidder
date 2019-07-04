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

  handleSetDays = (os, feature) => {
    const {webDays} = this.state;
    const {iOSDays} = this.state;
    const {androidDays} = this.state;
    if (os === 'web'){
      const wd = webDays.map( d => d.id)
      if (wd.includes(feature.id) === false) {
        this.setState({webDays: [...webDays, feature]})
    }else 
      this.setState({webDays: webDays.filter( d => d.id !== feature.id)})
    } else if(os === 'ios'){
      const id = iOSDays.map( d => d.id)
      if (id.includes(feature.id) === false) {
        this.setState({iOSDays: [...iOSDays, feature]})
    }else 
      this.setState({iOSDays: iOSDays.filter( d => d.id !== feature.id)})
    } else if(os === 'android'){
      const ad = androidDays.map( d => d.id)
      if (ad.includes(feature.id) === false) {
        this.setState({androidDays: [...androidDays, feature]})
    }else 
      this.setState({androidDays: androidDays.filter( d => d.id !== feature.id)})
    };
  };

  remove = (value) => {
    this.setState(value)
  }

  
    
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

 