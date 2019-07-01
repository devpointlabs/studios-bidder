import React from 'react';

export const MathContext = React.createContext();
export const MathConsumer = MathContext.Consumer;

export class MathProvider extends React.Component {
  state = { 
    web: [
    {base_days: 10, multiplier: 350, enabled: true, },
    {base_days: 10, multiplier: 300, enabled: true, },
    {base_days: 10, multiplier: 500, enabled: true, },
    ], 
    iOS: [
    {base_days: 10, multiplier: 100, enabled: true, },
    {base_days: 10, multiplier: 100, enabled: true, }, 
    ], 
    android: [
    {base_days: 5, multiplier: 100, enabled: true, },
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

  

  // handleID = (IDs, OS) => {
  //   switch(OS) {
  //     case 'Web':
  //     this.setState({Web: [...this.Web, res.data], });
  //     case 'IOS':
  //       this.setState({IOS: [...this.IOS, res.data], });
  //     case 'Android':
  //       this.setState({Android: [...this.Android, res.data], });
  //   }
  // };
    
  render() {

      const {webPrice} = this.state
      const {iOSPrice} = this.state
      const {androidPrice} = this.state
    
    return (
      <MathContext.Provider value={{
       ...this.state,
       webPrice, iOSPrice, androidPrice,
       handleSetPrice: this.handleSetPrice,
      }}>
        {this.props.children}
      </MathContext.Provider>
    );
  };
};

 