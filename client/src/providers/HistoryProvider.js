import React from 'react';
import axios from 'axios';
export const HistoryContext = React.createContext();
export const HistoryConsumer = HistoryContext.Consumer;


export class HistoryProvider extends React.Component {
  state = { 
  }

  render() {
    
    return (
      <HistoryContext.Provider value={{
       ...this.state,
      }}>
      {this.props.children}
    </HistoryContext.Provider>
  );
};
};