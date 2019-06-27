import React from 'react';
import axios from 'axios';

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends React.Component {
  state = { Web: [], IOS: [], Android: [], } 


  handleID = (IDs, OS) => {
    axios.get(`/api/`)
      .then( res => {
        switch(OS) {
          case 'Web':
          this.setState({Web: [...Web, res.data], });
          case 'IOS':
            this.setState({IOS: [...IOS, res.data], });
          case 'Android':
            this.setState({Android: [...Android, res.data], });
        }
      })
  };

 

  render() {
    return (
      <AuthContext.Provider value={{
       

      }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  };
};

info in Here
Math in 
