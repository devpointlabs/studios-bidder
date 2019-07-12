import React from 'react';
export const FeatureContext = React.createContext();
export const FeatureConsumer = FeatureContext.Consumer;


export class FeatureProvider extends React.Component {
  state = { 
    allFeatures: [],
    allCategories: [],
    featuresFromEstimate: [],
    categoriesFromEstimate: [],
    iosCategories: [],
    webCategories: [],
    androidCategories: [],
    iosFeatures: [],
    webFeatures: [],
    androidFeatures: [],
    };

  handleFeatures = (features) => {
    const {allFeatures, iosFeatures, webFeatures, androidFeatures} = this.state;
    this.setState({allFeatures: [...features]});
    }
  }

  // componenet did update/ comparison if this.state.features /= features then go through and do map
  splitFeatures = () => {
    allFeatures.map( f => { 
      // var platform = f.platform_id
      if (f.platform_id === 1) {
        this.setState({iosFeatures: [...iosFeatures, f]})};
      if (f.platform_id === 2) {
        this.setState({androidFeatures: [...androidFeatures, f]})};
      if (f.platform_id === 3) {
        this.setState({webFeatures: [...webFeatures, f]})};
  }


  handleCategories = (categories) => {
    const {allCategories} = this.state;
    this.setState({allCategories: [...categories]});
  };

  handleSelected = () => {

  };



  render() {
    
    return (
      <FeatureContext.Provider value={{
       ...this.state,
       handleSelected: this.handleSelected,
      //  handleAll: this.handleAll,
       handleFeatures: this.handleFeatures,
       handleCategories: this.handleCategories,
      }}>
        {this.props.children}
      </FeatureContext.Provider>
    );
  };
};