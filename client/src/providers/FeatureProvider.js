import React from 'react';
import axios from 'axios';
export const FeatureContext = React.createContext();
export const FeatureConsumer = FeatureContext.Consumer;


export class FeatureProvider extends React.Component {
  state = { 
    allFeatures: [],
    allCategories: [],
    featureIDsFromEstimate: [],
    featuresFromEstimate: [],
    categoriesFromEstimate: [],
    iosCategories: [],
    webCategories: [],
    androidCategories: [],
    iosFeatures: [],
    webFeatures: [],
    androidFeatures: [],
    selectedEstimate: [],
    // platformFeatures: [],
    // platformCategories: [],
    featuresLoaded: false,
    estimateLoaded: false,
    };
    
      // toPlatformItems = (platformByNum) => {
      //   // debugger
      //   const {platformFeatures, platformCategories, featuresFromEstimate, categoriesFromEstimate} = this.state;
      //   const pFeatures = featuresFromEstimate.filter(f => f.platform_id === platformByNum);
      //   this.setState({platformFeatures: [...pFeatures]})
      //   const pCategories = categoriesFromEstimate.filter(c => c.platform_id === platformByNum);
      //   this.setState({platformCategories: [...pCategories]})
      //   // platformCategories.push(...pCategories)
      // };

  setFeaturesLoaded = () => {
    this.setState({featuresLoaded: true})
  }

  setEstimateLoaded = () => {
    this.setState({estimateLoaded: true})
  }

  handleFeatures = (features) => {
    const {allFeatures} = this.state;
    this.setState({allFeatures: [...features]});
    features.map( f => { 
      const {iosFeatures, webFeatures, androidFeatures} = this.state;
      if (f.platform_id === 1) {
        this.setState({iosFeatures: [...iosFeatures, f]})};
      if (f.platform_id === 2) {
        this.setState({androidFeatures: [...androidFeatures, f]})};
      if (f.platform_id === 3) {
        this.setState({webFeatures: [...webFeatures, f]})};
    });
  }

  handleCategories = (categories) => {
    const {allCategories} = this.state;
    this.setState({allCategories: [...categories]});
    categories.map( c => { 
      const {iosCategories, webCategories, androidCategories} = this.state;
      if (c.platform_id === 1) {
        this.setState({iosCategories: [...iosCategories, c]})};
      if (c.platform_id === 2) {
        this.setState({androidCategories: [...androidCategories, c]})};
      if (c.platform_id === 3) {
        this.setState({webCategories: [...webCategories, c]})};
    }) 
  };


  handleSelectedIDs = () => {
    const {allFeatures, allCategories, featureIDsFromEstimate, featuresFromEstimate, categoriesFromEstimate} = this.state;
    featureIDsFromEstimate.map(fe => {
      const finalFeatures = allFeatures.filter(f => f.id === fe)
      featuresFromEstimate.push(...finalFeatures)
      this.setState({featuresFromEstimate})
    })
    featuresFromEstimate.map(f => {
      const finalCategories = allCategories.filter(c => c.id === f.category_id)
      categoriesFromEstimate.push(...finalCategories)
      this.setState({categoriesFromEstimate})
    })
  }

  handleResetIDs = () => {
    this.setState({featureIDsFromEstimate: [], featuresFromEstimate: [], categoriesFromEstimate: []})
  }

  // handleHistoryClick = (estimate_id) => {
  //   const {featureIDsFromHistory} = this.state;
  //   axios.get(`/api/features_estimates`, {estimate_id: estimate_id})
  //     .then( res => featureIDsFromHistory.push(...res.data)) 
  // }

  // handleHistoryIDs = () => {
  //   const {allFeatures, allCategories, featureIDsFromHistory, featuresFromHistory, categoriesFromHistory} = this.state;
  //   featureIDsFromHistory.map(fe => {
  //     const finalFeatures = allFeatures.filter(f => f.id === fe)
  //     featuresFromHistory.push(...finalFeatures)
  //     this.setState({featuresFromHistory})
  //   })
  //   featureIDsFromHistory.map(f => {
  //     const finalCategories = allCategories.filter(c => c.id === f.category_id)
  //     categoriesFromHistory.push(...finalCategories)
  //     this.setState({categoriesFromHistory})
  //   })
  // }

  ResetEstimate = () => {
    this.setState({fullEstimates: []})
  }
  

  render() {
    
    return (
      <FeatureContext.Provider value={{
       ...this.state,
       handleFeatures: this.handleFeatures,
       handleCategories: this.handleCategories,
       handleSelectedIDs: this.handleSelectedIDs,
       toPlatformItems: this.toPlatformItems,
      //  handleEstimate: this.handleEstimate,
       handleResetIDs: this.handleResetIDs,
       setFeaturesLoaded: this.setFeaturesLoaded,
       handleHistoryClick: this.handleHistoryClick,
       setEstimateLoaded: this.setEstimateLoaded,
       handleEstimates: this.handleEstimates,
       ResetEstimate: this.ResetEstimate,
      }}>
        {this.props.children}
      </FeatureContext.Provider>
    );
  };
};